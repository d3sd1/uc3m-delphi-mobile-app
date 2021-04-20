import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Process} from '../../process';
import {User} from '../../../user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserStorage} from '../../../../core/storage/user.storage';
import {Round} from '../../round';
import {Question} from '../../question';

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
    private userStorage: UserStorage) {
  }
  public onItemReorder({ detail }) {
    detail.complete(true);
  }
  private async loadProcess() {
    this.route.queryParams.subscribe(async params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.process = this.router.getCurrentNavigation().extras.state.process;
        console.log(this.process)
        if(this.process.rounds === undefined) {
          this.process.rounds = [];
        }
      } else {
        await this.router.navigateByUrl('/logged-in/home/menu/processes');
      }
    });
  }

  addRound() {
    this.process.rounds.push(new Round('Ronda xx', [], null, false));
  }

  public async ngOnInit(): Promise<void> {
    await this.loadProcess();
    this.currentUser = await this.userStorage.getUser();
  }

  goBack() {
    this.navCtrl.back();
  }

}
