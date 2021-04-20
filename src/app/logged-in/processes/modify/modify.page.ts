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
import {map} from 'rxjs/operators';
import {RoleService} from '../role.service';
import {Role} from '../../role';
import {DelphiProcessUser} from '../delphi-process-user';
import {UserStorage} from '../../../core/storage/user.storage';
import {Media} from '../media';

@Component({
  selector: 'delphi-create',
  templateUrl: './modify.page.html',
  styleUrls: ['./modify.page.scss'],
})
export class ModifyPage implements OnInit {

  QuestionType = QuestionType;
  process: Process;
  currentUser: User;

  @ViewChild(IonContent, {read: IonContent, static: false}) createProcess: IonContent;

  constructor(private httpClient: HttpClient,
              private navCtrl: NavController,
              private route: ActivatedRoute,
              public loadingController: LoadingController,
              private router: Router,
              private toastController: ToastController,
              private sanitizer: DomSanitizer,
              public roleService:RoleService,
              private userStorage: UserStorage) {
  }


  private async loadProcess() {
    this.route.queryParams.subscribe(async params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.process = this.router.getCurrentNavigation().extras.state.process;
      } else {
        this.process = new Process();
      }
    });
  }

  public async ngOnInit(): Promise<void> {
    await this.loadProcess();
    this.currentUser = await this.userStorage.getUser();
    this.forceCurrentUserAdmin();
  }

  forceCurrentUserAdmin() {
    const admRole = this.roleService.getRoleByName('ADMIN');
    const userIndex = this.process?.processUsers.findIndex((processUser) => {
      return processUser.user.id === this.currentUser.id;
    });
    if (userIndex === -1) {
      this.process?.processUsers.push(new DelphiProcessUser(this.currentUser, admRole));
    } else if(this.process !== undefined) {
      this.process.processUsers[userIndex].role = admRole;
    }
  }

  @ViewChild('uploadPicture') uploadPicture: ElementRef;
  triggerUploadImage() {
    this.uploadPicture.nativeElement.click();
  }

  validateForm(): boolean {
    return true; // TODO
  }


  async saveProcess() {
    if(!this.validateForm()) {
      return;
    }
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Guardando...',
      duration: 0
    });
    await loading.present();

    await this.httpClient.post<Process>(environment.apiUrl + '/v1/process/save', this.process).toPromise().then(async (delphiProcess: Process) => {
      await this.showToast('Proceso guardado correctamente.');
      await this.router.navigateByUrl('/logged-in/home/menu/processes', {
        state: {process: this.process}
      });
    }).catch(async (errMessage: string) => {
      await this.showToast('Proceso guardado correctamente.');
    }).finally(async () => {
      await loading.dismiss();
    });
  }

  async uploadImage() {
    const formData = new FormData();
    formData.append('image', this.uploadPicture.nativeElement.files[0]);
    this.httpClient.post<Media>(environment.apiUrl + '/v1/media/upload', formData, {headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })}).subscribe(
      async (res) => {
        this.process.pictureUrl = environment.apiUrl + '/v1/media/fetch/' + res.id;
      },
      (err) => console.log(err)
    );
    //await this.userStorage.setUser(this.user);
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
  countUsersRole(role: Role) {
    return this.process.processUsers?.filter((delphiProcessUser) => {
      return delphiProcessUser.role?.id === role.id;
    }).length;
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

}
