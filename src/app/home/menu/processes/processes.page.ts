import {Component} from '@angular/core';

@Component({
  selector: 'delphi-processes',
  templateUrl: 'processes.page.html',
  styleUrls: ['processes.page.scss']
})
export class ProcessesPage {

  processes: any = null;
  loaded = false;

  constructor() {
  }

  ionViewWillEnter() {

    setTimeout(() => {
      this.processes = [
        {
          id: 1,
          picture: 'https://okdiario.com/img/2019/09/05/mejores-frases-de-homer-simpson-655x368.jpg',
          description: 'Proceso delphi num xxx',
          remainingTime: '34 días',
          status: 'active',
          results: null
        },
        {
          id: 1,
          picture: 'https://okdiario.com/img/2019/09/05/mejores-frases-de-homer-simpson-655x368.jpg',
          description: 'Proceso delphi num xxx',
          remainingTime: '34 días',
          status: 'active',
          results: null
        },
        {
          id: 1,
          picture: 'https://okdiario.com/img/2019/09/05/mejores-frases-de-homer-simpson-655x368.jpg',
          description: 'Proceso delphi num xxx',
          remainingTime: '34 días',
          status: 'active',
          results: null
        },
        {
          id: 1,
          picture: 'https://okdiario.com/img/2019/09/05/mejores-frases-de-homer-simpson-655x368.jpg',
          description: 'Proceso delphi num xxx',
          remainingTime: '34 días',
          status: 'finished',
          results: null
        }
      ];
      this.loaded = true;
    }, 5000);
  }

}
