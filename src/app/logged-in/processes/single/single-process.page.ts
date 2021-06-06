import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IonContent, IonReorderGroup, LoadingController, ToastController} from '@ionic/angular';
import {Process} from '../../../core/model/process';
import {User} from '../../../core/model/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Question} from '../../../core/model/question';
import {QuestionType} from '../../../core/model/question-type';
import {ItemReorderEventDetail} from '@ionic/core';
import {Round} from '../../../core/model/round';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Media} from '../../../core/model/media';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'delphi-create',
  templateUrl: './single-process.page.html',
  styleUrls: ['./single-process.page.scss'],
})
export class SingleProcessPage {
  process: Process;
  createMode = false;
  user: User;
  @ViewChild(IonContent, {read: IonContent, static: false}) createProcess: IonContent;
  @ViewChild('uploadPicture') uploadPicture: ElementRef;
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute,
              public loadingController: LoadingController,
              private toastController: ToastController,
              private sanitizer: DomSanitizer,
              private translate: TranslateService) {
    this.route.snapshot.data['user'].subscribe((user) => {
      this.user = user;
    });
    this.route.snapshot.data['process'].subscribe((process) => {
      console.log('process is', process)
      this.process = process;
    });
  }

  isCoordinator(): boolean {
    return this.process.coordinators.findIndex((user) => user.id === this.user.id) !== -1;
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
    this.uploadPicture.nativeElement.click();
  }

  validateForm(): boolean {
    if (this.process.name === '' ||
      this.process.name === null ||
      this.process.name === undefined) {
      this.showToast('home.processes.single.errors.no_name');
      return false;
    }
    if (this.process.description === '' ||
      this.process.description === null ||
      this.process.description === undefined) {
      this.showToast('home.processes.single.errors.no_description');
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
      message: await this.translate.get('home.processes.single.single.saving').toPromise(),
      duration: 0
    });
    await loading.present();

    await this.httpClient.post<Process>(environment.apiUrl + '/v1/process/save', this.process).toPromise().then(async (delphiProcess: Process) => {
      await this.showToast(await this.translate.get('home.processes.single.single.saved').toPromise());
      //TODO await this.router.navigateByUrl('/logged-in/home/menu/processes', {
      // state: {process: this.process}
      //});
    }).catch(async (errMessage: string) => {
      await this.showToast(await this.translate.get('home.processes.single.single.saved').toPromise());
    }).finally(async () => {
      await loading.dismiss();
    });
  }

  private async showToast(transKey: string) {
    const toast = await this.toastController.create({
      position: 'top',
      message: await this.translate.get(transKey).toPromise(),
    });
    await toast.present();
    setTimeout(() => {
      toast.dismiss();
    }, 3000);
    return toast;
  }

}
