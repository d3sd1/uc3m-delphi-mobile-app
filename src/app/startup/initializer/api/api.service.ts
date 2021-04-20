import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {InitializerChecker} from '../initializer-checker';
import {AlertController, Platform} from '@ionic/angular';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends InitializerChecker {

  constructor(private httpClient: HttpClient, protected alertController: AlertController, private platorm: Platform) {
    super(alertController, platorm);
  }

  protected internalCheck(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.httpClient.get(environment.apiUrl + '/v1/version/current').subscribe(() => {
        resolve();
      }, (e) => {
        console.error(e);
        reject();
      });
    });
  }

  protected errorMessage(): string {
    return 'No se ha podido conectar a la api.';
  }

  protected stopLoadingOnError(): boolean {
    return true;
  }
}
