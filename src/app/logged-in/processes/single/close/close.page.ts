import {Component, OnDestroy, OnInit} from '@angular/core';
import {Process} from '../../../../core/model/process';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../../core/model/user';
import {UserConsumer} from '../../../user.consumer';
import {ProcessConsumer} from '../../process.consumer';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../../../core/service/notification.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'delphi-close',
  templateUrl: './close.page.html',
  styleUrls: ['./close.page.scss'],
})
export class ClosePage implements OnInit, OnDestroy {

  process: Process;
  user: User;
  processSubscription: Subscription;
  userSubscription: Subscription;
  loading: HTMLIonLoadingElement;
  redirect: string;

  closeProcessForm = new FormGroup({
    conclusion: new FormControl(''),
  });

  constructor(
    private navCtrl: NavController,
    private ns: NotificationService,
    private route: ActivatedRoute,
    private userConsumer: UserConsumer,
    private httpClient: HttpClient,
    private processConsumer: ProcessConsumer) {

  }

  ngOnInit(): void {

    this.route.params.subscribe(
      params => {
        this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
          if (user === null) {
            return;
          }
          this.user = user;
        });
        this.processSubscription = this.processConsumer.getProcesses().subscribe((processes) => {
          if (processes == null || processes.length === 0) {
            return;
          }
          this.process = processes.find(p2 => p2.id === +params.id);
          if (this.process === undefined) {
            return;
          }
          if (this.loading && this.redirect) {
            this.loading.dismiss().then(() => this.navCtrl.navigateForward(this.redirect).then(this.ngOnDestroy));
          } else if (this.loading) {
            this.loading.dismiss().then(null);
          }
          // If process is finished, do not allow to stay on this page
          if (this.process.finished) {
            this.navCtrl.navigateBack('/logged-in/menu/processes/finished/' + this.process.id).then(this.ngOnDestroy);
          }
        });
      });
  }


  closeProcessConfirmation() {
    this.ns.showAlert('Confirmación', '¿Seguro que deseas cerrar el proceso?', {
      text: 'Cerrar',
      handler: () => {
        this.ns.removeAlert();
        this.closeProcess();
      }
    }, 'Cancelar', null, 'Una vez cerrado no podrá ser modificado.');
  }

  closeProcess() {
    if (this.process.conclusion === '' || this.process.conclusion === undefined || this.process.conclusion === null) {
      this.ns.showToast('Debes introducir una conclusión');
      return;
    }
    this.processConsumer.closeProcess(this.process.id, this.closeProcessForm.get('conclusion').value);

    this.ns.showLoading('Cerrando proceso...', 0).then(l => {
      this.redirect = '/logged-in/menu/processes/finished/' + this.process.id;
      this.loading = l;
    });
  }


  ngOnDestroy(): void {
    if (this.userSubscription && !this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
    if (this.processSubscription && !this.processSubscription.closed) {
      this.processSubscription.unsubscribe();
    }
    this.closeProcessForm.reset();
    this.process = undefined;
    this.redirect = undefined;
    this.user = undefined;
  }
}
