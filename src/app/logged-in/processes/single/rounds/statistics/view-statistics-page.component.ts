import {Component, OnDestroy} from '@angular/core';
import {ActionSheetController, NavController} from '@ionic/angular';
import {Process} from '../../../../../core/model/process';
import {User} from '../../../../../core/model/user';
import {ActivatedRoute} from '@angular/router';
import {UserConsumer} from '../../../../user.consumer';
import {ProcessConsumer} from '../../../process.consumer';
import {Question} from '../../../../../core/model/question';
import {ChartConfiguration, ChartData, ChartType} from 'chart.js';
import {Subscription} from 'rxjs';

@Component({
  selector: 'delphi-rounds',
  templateUrl: './view-statistics-page.component.html',
  styleUrls: ['./view-statistics-page.component.scss'],
})
export class ViewStatisticsPage implements OnDestroy {


  public scatterChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public scatterChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public scatterChartData: ChartData<'scatter'> = {
    labels: this.scatterChartLabels,
    datasets: [
      {
        data: [
          {x: 1, y: 1},
          {x: 2, y: 3},
          {x: 3, y: -2},
          {x: 4, y: 4},
          {x: 5, y: -3},
        ],
        label: 'Series A',
        pointRadius: 10,
      },
    ]
  };
  public scatterChartType: ChartType = 'scatter';


  // Radar
  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public radarChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [
      {data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A'},
      {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
    ]
  };
  public radarChartType: ChartType = 'radar';

  process: Process;
  currentUser: User;
  processSubscription: Subscription;
  routeSubscription: Subscription;
  userSubscription: Subscription;
  roundIdx: number;
  selectedStatKind: string;
  selectedQuestion: Question;
  showChart = false;

  constructor(
    private navCtrl: NavController,
    private userConsumer: UserConsumer,
    private processConsumer: ProcessConsumer,
    private route: ActivatedRoute,
    public actionSheetController: ActionSheetController) {
    this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
      if (user === null) {
        return;
      }
      this.currentUser = user;
    });

    this.routeSubscription = this.route.params.subscribe(params => {
      if (params === null) {
        return;
      }
      this.processSubscription = this.processConsumer.getProcesses().subscribe((processes) => {
        if (processes == null) {
          return;
        }
        const process = processes.find(p2 => p2.id === +params.id);
        if (process === null) {
          return;
        }
        this.process = process;
        this.roundIdx = process.pastRounds.findIndex(q => q.id === +params.roundid);
      });
    });
  }

  updateChart() {
    if (this.selectedStatKind !== null &&
      this.selectedQuestion !== null &&
      this.selectedStatKind !== undefined &&
      this.selectedQuestion !== undefined) {
      this.showChart = true;
    } else {
      this.showChart = false;
    }
  }

  // events
  public chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {

  }

  public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {

  }


  ngOnDestroy(): void {
    if (!this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
    if (!this.processSubscription.closed) {
      this.processSubscription.unsubscribe();
    }
    if (!this.routeSubscription.closed) {
      this.routeSubscription.unsubscribe();
    }
    this.process = undefined;
    this.currentUser = undefined;
  }
}

