import {Component} from '@angular/core';

@Component({
  selector: 'delphi-root',
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>`
})
export class EntrypointPage {

  /*
  TODO:
  - unsubscriptions, y que al conectar/desconectar user funque t odo bien
  - preguntas de categorias (multiple simple ponderada)
  -  modificar preguntas (ahora mismo no se puede)
  - probar votacion multiple en varios dispositivos
  - que actualice datos al guardar participacion con datos anteriores
   */
}
