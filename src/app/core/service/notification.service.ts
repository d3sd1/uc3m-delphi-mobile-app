import {Injectable} from '@angular/core';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private tc: ToastController,
              private ac: AlertController,
              private lc: LoadingController) {
  }


  public showToast(text: string) {
    this.tc.create({
      position: 'top',
      message: text,
    }).then(toast => {
      toast.present().then(() => {
        setTimeout(() => {
          toast.dismiss().then(() => {
          });
        }, 3000);
      });
    });
  }

  public showAlert(header: string,
                   subHeader: string,
                   cancelBtn: string | object,
                   okBtn: string | object = null,
                   inputs: {}[] = null,
                   message: string = null) {
    const buttons = [];
    if (okBtn !== null) {
      buttons.push(okBtn);
    }
    if (cancelBtn !== null) {
      buttons.push(cancelBtn);
    }
    const conf = {
      header,
      subHeader,
      buttons,
      inputs: [],
      message
    };
    if (inputs !== null) {
      conf.inputs = inputs;
    }
    this.ac.create(conf).then((alert) => {
      alert.present().then(null);
    });
  }

  public removeAlert() {
    this.ac.getTop().then((alert) => alert.dismiss());
  }

  public showLoading(message: string, duration = 2000): Promise<HTMLIonLoadingElement> {
    return new Promise<HTMLIonLoadingElement>((resolve) => {
      this.lc.create({
        message,
        duration
      }).then(loading => {
        return loading.present().then(() => {
          resolve(loading);
        });
      });
    });
  }


}
