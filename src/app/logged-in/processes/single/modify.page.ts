import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IonContent, IonReorderGroup, LoadingController, ToastController} from '@ionic/angular';
import {Process} from '../process';
import {User} from '../../user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Question} from './questions/question';
import {QuestionType} from './questions/question-type';
import {ItemReorderEventDetail} from '@ionic/core';
import {Round} from './rounds/round';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Media} from './media';
import {TranslateService} from '@ngx-translate/core';
import {EditingProcessConsumer} from '../../../core/consumer/process/editing-process.consumer';

@Component({
  selector: 'delphi-create',
  templateUrl: './modify.page.html',
  styleUrls: ['./modify.page.scss'],
})
export class ModifyPage implements OnInit {
  process: Process = new Process(); // todo handle via router
  user: User;
  @ViewChild(IonContent, {read: IonContent, static: false}) createProcess: IonContent;
  @ViewChild('uploadPicture') uploadPicture: ElementRef;
  expandedQuestion: Question;
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute,
              public loadingController: LoadingController,
              private toastController: ToastController,
              private sanitizer: DomSanitizer,
              private translate: TranslateService,
              private modifyingProcessConsumer: EditingProcessConsumer) {
    this.route.snapshot.data['user'].subscribe((user) => {
      this.user = user;
    });
    this.route.snapshot.data['process'].subscribe((process) => {
      this.process = process;
    });
  }

  public async ngOnInit(): Promise<void> {
    this.sanitizeProcess();
    this.forceCurrentUserAdmin();
    /* this.process = (await this.modifyingProcessConsumer.currentProcess()).getValue();
    ;*/
  }

  syncProcess() {
    this.modifyingProcessConsumer.saveCurrentprocess(this.process);
  }

  sanitizeProcess() {
    if (this.process?.coordinators === undefined ||
      this.process?.coordinators === null) {
      this.process.coordinators = [];
    }
    if (this.process?.experts === undefined ||
      this.process?.experts === null) {
      this.process.experts = [];
    }
  }

  forceCurrentUserAdmin() {
    /* if(this.process?.coordinators?.filter(user => user.id === ).length  === 0) {

     }*/
  }

  async uploadImage() {
    const formData = new FormData();
    formData.append('image', this.uploadPicture.nativeElement.files[0]);
    this.httpClient.post<Media>(environment.apiUrl + '/v1/media/upload', formData, {headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})}).subscribe(
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

  async addQuestion(round: Round) {
    const question = new Question();
    question.name = await this.translate.get('home.processes.single.single.question').toPromise();
    this.process.currentRound.questions.push(question);
    await this.createProcess.scrollToBottom(300);
  }

  expandQuestion(question: Question) {
    this.expandedQuestion = question;
    if (this.expandedQuestion.type === null) {
      this.expandedQuestion.type = QuestionType.QUALITATIVE;
    }
  }

  compressQuestion(round: Round) {
    this.process.currentRound.questions.find((question: Question) => {
      return question.id === this.expandedQuestion.id;
    });
    this.expandedQuestion = null;
  }

  doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    ev.detail.complete();
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
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
