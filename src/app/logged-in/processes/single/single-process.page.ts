import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonContent, IonReorderGroup, LoadingController, NavController, ToastController} from '@ionic/angular';
import {Process} from '../../../core/model/process';
import {User} from '../../../core/model/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Media} from '../../../core/model/media';
import {TranslateService} from '@ngx-translate/core';
import {UserConsumer} from '../../../core/consumer/user/user.consumer';
import {ProcessConsumer} from '../../../core/consumer/process/process.consumer';

@Component({
  selector: 'delphi-create',
  templateUrl: './single-process.page.html',
  styleUrls: ['./single-process.page.scss'],
})
export class SingleProcessPage {
  process: Process = new Process();
  createMode = false;
  user: User = new User();
  @ViewChild(IonContent, {read: IonContent, static: false}) createProcess: IonContent;
  @ViewChild('uploadPicture') uploadPicture: ElementRef;
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute,
              public loadingController: LoadingController,
              public userConsumer: UserConsumer,
              private toastController: ToastController,
              private sanitizer: DomSanitizer,
              private translate: TranslateService,
              private processConsumer: ProcessConsumer,
              private navCtrl: NavController) {
    this.userConsumer.getUser().subscribe((user) => {
      if (user !== null) {
        this.user = user;
      }
    });
    this.route.params.subscribe(params => {
      this.processConsumer.getProcess(+params.id).subscribe((process) => {
        console.log('received process:', process);
        this.process = process;
      });
    });
  }

  isCoordinator(): boolean {
    return this.process?.coordinators.findIndex((user) => user.id === this.user?.id) !== -1;
  }

  alreadyVoted(): boolean {
    console.log('experts remaining: , ', this.process.currentRound?.expertsRemaining);
    if (this.process.currentRound?.expertsRemaining === undefined) {
      return false;
    }
    return this.process.currentRound?.expertsRemaining?.findIndex((user) => user.id === this.user?.id) !== -1;
  }

  async updateBasicFields() {
    console.log('call the update!!');
    this.processConsumer.updateProcessBasicData(this.process?.id, this.process?.name, this.process?.description, this.process?.objectives);
  }

  async uploadImage() {
    const formData = new FormData();
    formData.append('image', this.uploadPicture.nativeElement.files[0]);
    this.httpClient.post<Media>(environment.apiUrl + '/v1/process/photo?process_id=' + this.process.id, formData, {headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})}).subscribe(
      async (res) => {
        this.process.pictureUrl = environment.apiUrl + '/v1/media/fetch/' + res.id;
      },
      (err) => console.log(err)
    );
  }

  triggerUploadImage() {
    if (!this.isCoordinator() || this.process.finished) {
      return;
    }
    this.uploadPicture.nativeElement.click();
  }

  validateForm(): boolean {
    if (this.process?.name === '' ||
      this.process?.name === null ||
      this.process?.name === undefined) {
      this.showToast('home.processes.finished.errors.no_name');
      return false;
    }
    if (this.process?.description === '' ||
      this.process?.description === null ||
      this.process?.description === undefined) {
      this.showToast('home.processes.finished.errors.no_description');
      return false;
    }
    return true;
  }

  async saveProcess() {
    if (!this.validateForm()) {
      return;
    }
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: await this.translate.get('home.processes.finished.finished.saving').toPromise(),
      duration: 0
    });
    await loading.present();

    await this.httpClient.post<Process>(environment.apiUrl + '/v1/process/save', this.process).toPromise().then(async (delphiProcess: Process) => {
      await this.showToast(await this.translate.get('home.processes.finished.finished.saved').toPromise());
      //TODO await this.router.navigateByUrl('/logged-in/home/menu/processes', {
      // state: {process: this.process}
      //});
    }).catch(async (errMessage: string) => {
      await this.showToast(await this.translate.get('home.processes.finished.finished.saved').toPromise());
    }).finally(async () => {
      await loading.dismiss();
    });
  }

  private showToast(transKey: string) {
    this.toastController.create({
      position: 'top',
      message: transKey,
    }).then((toast) => {
      toast.present().then(r => {
        setTimeout(() => {
          toast.dismiss().then(r => null);
        }, 3000);
      });
    });
  }

  finishProcess() {
    if (this.process?.currentRound?.started) {
      this.showToast('No se puede cerrar el proceso cuando hay una ronda en curso.');
      return;
    }

    this.navCtrl.navigateForward('/logged-in/menu/processes/finished/' + this.process.id + '/close').then(r => null);
  }

  async participate() {
    if (!this.process.currentRound?.started) {
      this.showToast('El proceso no tiene la ronda actual abierta.');
      return;
    }

    this.navCtrl.navigateForward('/logged-in/menu/processes/finished/' + this.process.id + '/participate').then(r => null);
  }


}
