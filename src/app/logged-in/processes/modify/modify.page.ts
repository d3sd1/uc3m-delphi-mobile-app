import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IonContent, IonInfiniteScroll, IonReorderGroup, LoadingController, NavController, ToastController} from '@ionic/angular';
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

@Component({
  selector: 'delphi-create',
  templateUrl: './modify.page.html',
  styleUrls: ['./modify.page.scss'],
})
export class ModifyPage implements OnInit {

  QuestionType = QuestionType;
  expertsFiltered: User[] = [];
  process: Process;
  filterCriterial: string = '';

  @ViewChild(IonContent, {read: IonContent, static: false}) createProcess: IonContent;

  constructor(private httpClient: HttpClient,
              private navCtrl: NavController,
              private actRoute: ActivatedRoute,
              public loadingController: LoadingController,
              private router: Router,
              private toastController: ToastController,
              private sanitizer: DomSanitizer) {
  }

  async ngOnInit() {
    const processId = this.actRoute.snapshot.params.processId;
    this.resetProcess();
    if (processId !== null && processId !== undefined) {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Cargando proceso...',
        duration: 0
      });
      await loading.present();

      this.process = await this.httpClient.get<Process>(environment.apiUrl + '/v1/process/id/' + processId).toPromise();
      await loading.dismiss();
    }

  }
  @ViewChild('uploadPicture') uploadPicture: ElementRef;
  triggerUploadImage() {
    this.uploadPicture.nativeElement.click();
  }
  private async loadUserImage() {
    const blob = await this.httpClient.get(environment.apiUrl + '/v1/profile/img', {responseType: 'blob'}).toPromise();
    const objectURL = URL.createObjectURL(blob);
    const img = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    this.process.pictureUrl = img;
  }
  async uploadImage() {
    console.log("upload")
    const formData = new FormData();
    formData.append('image', this.uploadPicture.nativeElement.files[0]);
    console.log(this.uploadPicture.nativeElement.value)
    this.httpClient.post(environment.apiUrl + '/v1/profile/img', formData, {headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })}).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    //await this.loadUserImage();
    //await this.userStorage.setUser(this.user);
  }

  async saveProcess() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Guardando...',
      duration: 0
    });
    await loading.present();

    // TODO this.process.pictureUrl = 'aaaaaaa';
   this.process.endTime = new Date(this.process.endTime).toISOString();
    await this.httpClient.post<Process>(environment.apiUrl + '/v1/process/save', this.process).toPromise().then(async (delphiProcess: Process) => {
      await this.showToast('Proceso guardado correctamente.');
      await this.router.navigateByUrl('/logged-in/home/menu/processes');
    }).catch(async (errMessage: string) => {
      await this.showToast('Proceso guardado correctamente.');
    }).finally(async () => {
      await loading.dismiss();
    });
  }

  private async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
    });
    await toast.present();
    setTimeout(() => {
      toast.dismiss();
    }, 3000);
    return toast;
  }

  async filterExperts() {
    if (this.filterCriterial === '' || this.filterCriterial === null) {
      return;
    }
    const users = await this.httpClient.get<User[]>(environment.apiUrl + '/v1/process/filter/expert?criteria=' + this.filterCriterial).toPromise();
    this.expertsFiltered = users.filter((expert: User) => {
      return !this.process.experts.find((pExpert: User) => {
        return pExpert.id === expert.id;
      });
    });
  }

  async addRound() {
    const round = new Round();
    round.name = 'Ronda ' + (this.process.rounds.length + 1);
    round.finishTime = new Date();
    round.questions = [];
    this.process.rounds.push(round);
    await this.createProcess.scrollToBottom(300);
  }

  async addQuestion(round: Round) {
    const roundIndex = this.process.rounds.findIndex((iRound: Round) => {
      return iRound.id === round.id;
    });
    const question = new Question();
    question.name = 'Pregunta ' + (this.process.rounds[roundIndex].questions.length + 1);
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

  goBack() {
    this.navCtrl.back();
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
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }

  pushExpert(expert: User) {
    if (this.process.experts.find((pExpert: User) => {
      return pExpert.id === expert.id;
    })) {
      return;
    }
    this.expertsFiltered = this.expertsFiltered.filter((pExpert: User) => {
      return pExpert.id !== expert.id;
    });
    this.process.experts.push(expert);
    this.filterCriterial = '';
  }

  removeExpert(expert: User) {
    this.process.experts = this.process.experts.filter((pExpert: User) => {
      return pExpert.id !== expert.id;
    });
  }

  resetProcess() {
    this.process = new Process();
  }

}
