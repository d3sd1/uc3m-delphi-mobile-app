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
          picture: 'https://media.istockphoto.com/photos/manual-workers-working-in-warehouse-picture-id874515358?k=6&m=874515358&s=612x612&w=0&h=aH-FzxnMgR_x34RKtHy3E60tWTWNFKKzA6Lsna-z_G8=',
          description: 'Carretilleros',
          remainingTime: '34 días',
          status: 'active',
          results: null
        },
        {
          id: 2,
          picture: 'https://st2.depositphotos.com/2543399/6817/i/950/depositphotos_68174679-stock-photo-bricklayer-working-on-the-high.jpg',
          description: 'Trabajos en altura',
          remainingTime: '2 días',
          status: 'active',
          results: null
        },
        {
          id: 3,
          picture: 'https://st3.depositphotos.com/5392356/13702/i/1600/depositphotos_137026300-stock-photo-programmer-working-in-a-software.jpg',
          description: 'Programadores',
          remainingTime: '5 días',
          status: 'active',
          results: null
        },
        {
          id: 4,
          picture: 'https://media.istockphoto.com/photos/works-of-extension-of-a-road-with-excavator-and-delimited-by-safety-picture-id1027558182?k=6&m=1027558182&s=612x612&w=0&h=MJiJ9tq7rHSk1chxYs-G79CZ0Iw_8kc8WOkHYFDL5Sk=',
          description: 'Maquinaria pesada',
          remainingTime: 'Finalizado',
          status: 'finished',
          results: null
        }
      ];
      this.loaded = true;
    }, 5000);
  }

}
