import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Process} from '../../../core/model/process';
import {User} from '../../../core/model/user';
import {ActivatedRoute} from '@angular/router';
import {UserConsumer} from '../../user.consumer';
import {ProcessConsumer} from '../process.consumer';
import {NotificationService} from '../../../core/service/notification.service';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'delphi-create',
  templateUrl: './single-process.page.html',
  styleUrls: ['./single-process.page.scss'],
})
export class SingleProcessPage implements OnInit, OnDestroy {
  process: Process;
  user: User;
  processesSubscription: Subscription;
  userSubscription: Subscription;

  singleProcessForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    objectives: new FormControl(''),
  });

  constructor(private ns: NotificationService,
              public userConsumer: UserConsumer,
              private route: ActivatedRoute,
              private processConsumer: ProcessConsumer,
              private navCtrl: NavController) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
        if (user === null) {
          return;
        }
        this.user = user;
      });
      this.processesSubscription = this.processConsumer.getProcesses().subscribe((processes) => {
        if (processes == null) {
          return;
        }
        this.process = processes.find(p2 => p2.id === +params.id);
        if (this.process === undefined) {
          return;
        }
        if (this.process.name !== this.singleProcessForm.get('name').value) {
          this.singleProcessForm.get('name').setValue(this.process.name);
        }
        if (this.process.description !== this.singleProcessForm.get('description').value) {
          this.singleProcessForm.get('description').setValue(this.process.description);
        }
        if (this.process.objectives !== this.singleProcessForm.get('objectives').value) {
          this.singleProcessForm.get('objectives').setValue(this.process.objectives);
        }
        this.singleProcessForm.valueChanges.pipe(
          debounceTime(3000)).subscribe((formVals: any) => {
          this.updateBasicFields(formVals.name, formVals.description, formVals.objectives);
        });
      });
    });
  }


  isCoordinator(): boolean {
    return this.process.coordinators.findIndex((user) => user.id === this.user.id) !== -1;
  }

  alreadyVoted(): boolean {
    if (this.user === undefined || this.user === null || this.process.currentRound.expertsRemaining === undefined) {
      return false;
    }
    return this.process.currentRound.expertsRemaining.findIndex((user) => user.id === this.user.id) !== -1;
  }

  updateBasicFields(name: string, description: string, objectives: string) {
    if (!this.isCoordinator()) {
      return;
    }
    this.processConsumer.updateProcessBasicData(this.process.id, name, description, objectives);
  }

  finishProcess() {
    if (this.process.currentRound.started) {
      this.ns.showToast('No se puede cerrar el proceso cuando hay una ronda en curso.');
      return;
    }

    this.navCtrl.navigateForward('/logged-in/menu/processes/finished/' + this.process.id + '/close').then(r => null);
  }

  participate() {
    if (!this.process.currentRound.started) {
      this.ns.showToast('El proceso no tiene la ronda actual abierta.');
      return;
    }
    this.navCtrl.navigateForward('/logged-in/menu/processes/finished/' + this.process.id + '/participate').then(r => null);
  }

  ngOnDestroy(): void {

    if (!this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
    if (!this.processesSubscription.closed) {
      this.processesSubscription.unsubscribe();
    }
    this.process = undefined;
    this.user = undefined;
  }
}
