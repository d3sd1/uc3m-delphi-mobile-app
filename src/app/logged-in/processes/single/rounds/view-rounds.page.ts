import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {Process} from '../../process';
import {User} from '../../../user';

@Component({
  selector: 'delphi-rounds',
  templateUrl: './view-rounds.page.html',
  styleUrls: ['./view-rounds.page.scss'],
})
export class ViewRoundsPage implements OnInit {

  process: Process;
  currentUser: User;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router) {
  }

  async goBack() {
    await this.navCtrl.navigateBack('/logged-in/home/menu/processes/single', {
      state: {process: this.process, currentUser: this.currentUser}
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
    console.log(this.process.rounds);
    this.process.rounds.sort((a, b) => {
      // check if some1 is finished
      if (!a.finished && b.finished) {
        return -1;
      } else if (a.finished && !b.finished) {
        return 1;
      }

      // normal ordering
      if (a.orderPosition < b.orderPosition) {
        return -1;
      }
      if (a.orderPosition > b.orderPosition) {
        return 1;
      }
      return 0;
    });
  }

  public async ngOnInit(): Promise<void> {
    await this.loadProcess();
   //TODO  this.currentUser = await this.userStorage.getUser();
  }

}
