import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Process} from '../../../../../../core/model/process';
import {User} from '../../../../../../core/model/user';
import {ActivatedRoute} from '@angular/router';
import {UserConsumer} from '../../../../../user.consumer';
import {ProcessConsumer} from '../../../../process.consumer';
import {Question} from '../../../../../../core/model/question';
import {ChartData} from 'chart.js';
import {Subscription} from 'rxjs';
import {QuestionKindService} from '../../../../../../core/question-kind-service';
import {BaseChartDirective} from 'ng2-charts';
import {Answer} from '../../../../../../core/model/answer';

@Component({
  selector: 'delphi-rounds',
  templateUrl: './view-statistics-page.component.html',
  styleUrls: ['./view-statistics-page.component.scss'],
})
export class ViewStatisticsPage implements OnInit, OnDestroy {

  public graphData: ChartData<'radar'> = {
    labels: [],
    datasets: [
      {data: [], label: ''}
    ]
  };
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;


  process: Process;
  currentUser: User;
  processSubscription: Subscription;
  userSubscription: Subscription;
  roundIdx: number;
  selectedStatKind: string;
  selectedQuestion: Question;
  selectedQuestionAnswers: Answer[];
  showChart = false;

  constructor(
    private navCtrl: NavController,
    private userConsumer: UserConsumer,
    private processConsumer: ProcessConsumer,
    private route: ActivatedRoute,
    private qks: QuestionKindService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
          if (user === null) {
            return;
          }
          this.currentUser = user;
        });

        this.processSubscription = this.processConsumer.getProcesses().subscribe((processes) => {
          if (processes == null || processes.length === 0) {
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

  updateChart(evt) {
    this.selectedQuestion = evt;
    this.selectedQuestionAnswers = this.process.pastRounds[this.roundIdx].answers;
    if (!this.selectedQuestion) {
      return;
    }
    this.graphData.datasets[0].label = this.selectedQuestion.name;
    if (this.selectedQuestion.questionType.name === 'QUALITATIVE') {
      this.graphData.labels = [];
      this.graphData.datasets[0].data = [];
    } else if (this.selectedQuestion.questionType.name === 'QUANTITATIVE') {
      this.graphData.labels = [];
      for (let i = this.selectedQuestion.minVal; i <= this.selectedQuestion.maxVal; i++) {
        this.graphData.labels.push(i);
      }
      this.graphData.datasets[0].data = this.selectedQuestionAnswers.map(v => v.content);
    } else if (this.selectedQuestion.questionType.name === 'BOOLTYPE') {
      this.graphData.labels = this.qks.getBooleanKinds().map(v => v.value);
      this.graphData.datasets[0].data = this.selectedQuestionAnswers.map(v => v.content);
    } else if (this.selectedQuestion.questionType.name === 'CATLIKERT') {
      this.graphData.labels = this.qks.getLikertKinds().map(v => v.value);
      this.graphData.datasets[0].data = this.selectedQuestionAnswers.map(v => v.content);
    } else if (this.selectedQuestion.questionType.name === 'CATCUSTOM') {
      this.graphData.labels = this.selectedQuestion.categories.map(c => c.catName);
      this.graphData.datasets[0].data = this.selectedQuestionAnswers.map(v => v.content);
    } else if (this.selectedQuestion.questionType.name === 'CATMULTI') {
      this.graphData.labels = this.selectedQuestion.categories.map(c => c.catName);
      this.graphData.datasets[0].data = this.selectedQuestionAnswers.map(v => v.content);
    } else if (this.selectedQuestion.questionType.name === 'CATPOND') {
      this.graphData.labels = this.selectedQuestion.categories.map(c => c.catName);
      this.graphData.datasets[0].data = this.selectedQuestionAnswers.map(v => v.content);
    }
    if (this.chart) {
      this.chart.chart.update();
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription && !this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
    if (this.processSubscription && !this.processSubscription.closed) {
      this.processSubscription.unsubscribe();
    }
    this.process = undefined;
    this.currentUser = undefined;
  }
}

