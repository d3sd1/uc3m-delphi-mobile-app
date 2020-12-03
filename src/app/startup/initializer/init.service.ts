import {Injectable} from '@angular/core';
import {ApiService} from './api/api.service';
import {Plugins} from '@capacitor/core';
import {Platform} from '@ionic/angular';

const {App} = Plugins;


@Injectable({
  providedIn: 'root'
})
export class InitService {


  constructor(private apiService: ApiService, private platform: Platform) {
  }

  doInit(): Promise<boolean> {
    return this.initializeApi();
  }

  private initializeApi() {
    return new Promise<boolean>((resolve) => {
      this.apiService.doCheck().then(() => {
        resolve(true);
      }).catch((e) => {
        console.error('{INITIALIZE_API_ERR}', e);
        resolve(false);
      });
    });
  }
}
