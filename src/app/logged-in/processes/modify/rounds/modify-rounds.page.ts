import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {Process} from '../../process';
import {User} from '../../../user';
import {ActivatedRoute, Router, UrlTree} from '@angular/router';
import {UserStorage} from '../../../../core/storage/user.storage';
import {Round} from '../../round';
import {Question} from '../../question';
import {NavigationOptions} from '@ionic/angular/providers/nav-controller';

@Component({
  selector: 'delphi-rounds',
  templateUrl: './modify-rounds.page.html',
  styleUrls: ['./modify-rounds.page.scss'],
})
export class ModifyRoundsPage implements OnInit {

  process: Process;
  currentUser: User;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private userStorage: UserStorage,
    public alertController: AlertController) {
  }

  public onItemReorder({detail}) {
    detail.complete(true);
    const aux = this.process?.rounds[detail.to];
    this.process.rounds[detail.to] = this.process?.rounds[detail.from];
    this.process.rounds[detail.from] = aux;
    this.reAssignOrder();
  }

  deleteRound(roundIndex: number) {
    this.process.rounds.splice(roundIndex, 1);
  }

  async saveRounds() {
    let err = false;
    for (const round of this.process?.rounds) {
      if (round.endTime === null || round.endTime === undefined) {
        err = true;
      }
    }
    //TODO determine logic to add to it's role (pass role by routing)
    //TODO aqui al editar un proceso que ya tiene uysuarios los borra yt solo añade los nuevos
    // deberia combinar los antiguos y los nuevos, y actualizar roles (sin duplicados)
    if (err) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Error',
        subHeader: 'Existen rondas con errores',
        message: 'Existen rondas sin fecha de finalización. Debes asignarles una fecha de finalización.',
        buttons: ['Resolver']
      });

      await alert.present();
    } else {
      await this.navCtrl.navigateBack('/logged-in/home/menu/processes/modify', {
        state: {
          process: this.process
        }
      });
    }
  }

  reAssignOrder() {
    this.process.rounds.forEach((round: Round, index) => {
      round.orderPosition = index;
    });
  }

  private async loadProcess() {
    this.route.queryParams.subscribe(async params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.process = this.router.getCurrentNavigation().extras.state.process;
        if (this.process.rounds === undefined) {
          this.process.rounds = [];
        }
        this.sortRounds();
      } else {
        await this.router.navigateByUrl('/logged-in/home/menu/processes');
      }
    });
  }

  sortRounds() {
    this.process.rounds.sort((a, b) => {
      if (a.orderPosition < b.orderPosition) {
        return -1;
      }
      if (a.orderPosition > b.orderPosition) {
        return 1;
      }
      return 0;
    });
  }

  addRound() {
    this.process.rounds.push(new Round('Ronda ' + this.process.rounds.length, [], null, false));
    this.reAssignOrder();
  }

  public async ngOnInit(): Promise<void> {
    await this.loadProcess();
    this.currentUser = await this.userStorage.getUser();
  }

  async goBack() {
    await this.navCtrl.navigateBack('/logged-in/home/menu/processes/modify', {
      state: {process: this.process}
    });
  }

}
