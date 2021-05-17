import { Component, OnInit } from '@angular/core';
import {Process} from '../process';
import {User} from '../../user';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {UserStorage} from '../../../core/storage/user.storage';
import {Round} from '../round';

@Component({
  selector: 'delphi-participate',
  templateUrl: './participate.page.html',
  styleUrls: ['./participate.page.scss'],
})
export class ParticipatePage implements OnInit {

  process: Process;
  currentUser: User;

  currentRound: Round;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private userStorage: UserStorage) {
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
        this.findCurrentRound();
        console.log(this.currentRound)
      } else {
        await this.router.navigateByUrl('/logged-in/home/menu/processes');
      }
    });
  }


  public async ngOnInit(): Promise<void> {
    await this.loadProcess();
    this.currentUser = await this.userStorage.getUser();
  }

  public findCurrentRound(): void {
    this.process?.rounds?.forEach((round) => {
      if(round.current) {
        this.currentRound = round;
      }
    });
  }
  public saveParticipation() {

  }

}
