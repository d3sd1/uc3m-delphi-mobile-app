import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IonContent, IonReorderGroup, LoadingController, NavController, ToastController} from '@ionic/angular';
import {Process} from '../process';
import {User} from '../../user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Question} from '../question';
import {QuestionType} from '../question-type';
import {ItemReorderEventDetail} from '@ionic/core';
import {Round} from '../round';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Media} from '../media';
import {TranslateService} from '@ngx-translate/core';
import {ModifyingProcessConsumer} from '../../../core/consumer/process/modifying-process.consumer';

@Component({
  selector: 'delphi-create',
  templateUrl: './modify.page.html',
  styleUrls: ['./modify.page.scss'],
})
export class ModifyPage implements OnInit {
  process: Process;

  @ViewChild(IonContent, {read: IonContent, static: false}) createProcess: IonContent;

  constructor(private httpClient: HttpClient,
              private navCtrl: NavController,
              private route: ActivatedRoute,
              public loadingController: LoadingController,
              private router: Router,
              private toastController: ToastController,
              private sanitizer: DomSanitizer,
              private translate: TranslateService,
              private modifyingProcessConsumer:ModifyingProcessConsumer) {
  }

  public async ngOnInit(): Promise<void> {
    (await this.modifyingProcessConsumer.currentProcess()).toPromise().then((process) => {
      this.process = process;
    });
    this.forceCurrentUserAdmin();
  }

  forceCurrentUserAdmin() {
    //TODO set current user as adm
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

  @ViewChild('uploadPicture') uploadPicture: ElementRef;

  triggerUploadImage() {
    this.uploadPicture.nativeElement.click();
  }

  validateForm(): boolean {
    if(this.process.name === '' ||
      this.process.name === null ||
      this.process.name === undefined) {
      this.showToast('home.processes.modify.errors.no_name');
      return false;
    }
    if(this.process.description === '' ||
    this.process.description === null ||
    this.process.description === undefined) {
      this.showToast('home.processes.modify.errors.no_description');
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
      message: await this.translate.get('home.processes.view.modify.saving').toPromise(),
      duration: 0
    });
    await loading.present();

    await this.httpClient.post<Process>(environment.apiUrl + '/v1/process/save', this.process).toPromise().then(async (delphiProcess: Process) => {
      await this.showToast(await this.translate.get('home.processes.view.modify.saved').toPromise());
      await this.router.navigateByUrl('/logged-in/home/menu/processes', {
        state: {process: this.process}
      });
    }).catch(async (errMessage: string) => {
      await this.showToast(await this.translate.get('home.processes.view.modify.saved').toPromise());
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

  async addRound() {

    const round = new Round(await this.translate.get('home.processes.view.modify.round', {round: (this.process.rounds.length + 1)}).toPromise(), [], new Date(), false);
    this.process.rounds.push(round);
    await this.createProcess.scrollToBottom(300);
  }

  async addQuestion(round: Round) {
    const roundIndex = this.process.rounds.findIndex((iRound: Round) => {
      return iRound.id === round.id;
    });
    const question = new Question();
    question.name = await this.translate.get('home.processes.view.modify.question', {question: (this.process.rounds[roundIndex].questions.length + 1)}).toPromise()
    this.process.rounds[roundIndex].questions.push(question);
    await this.createProcess.scrollToBottom(300);
  }

  expandedQuestion: Question;

  expandQuestion(question: Question) {
    this.expandedQuestion = question;
    if (this.expandedQuestion.type === null) {
      this.expandedQuestion.type = QuestionType.QUALITATIVE;
    }
  }

  async goBack() {
    if(this.process.id === undefined) {
      await this.navCtrl.navigateBack('/logged-in/home/menu/processes', {
      });
    } else {
      await this.navCtrl.navigateBack('/logged-in/home/menu/processes/view');
    }
  }


  compressQuestion(round: Round) {
    const roundIndex = this.process.rounds.findIndex((iRound: Round) => {
      return iRound.id === round.id;
    });
    this.process.rounds[roundIndex].questions.find((question: Question) => {
      return question.id === this.expandedQuestion.id;
    });
    this.expandedQuestion = null;
  }

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    ev.detail.complete();
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }

}
