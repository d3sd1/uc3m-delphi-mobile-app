import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastController: ToastController) {
  }


  public showToast(text: string) {
    this.toastController.create({
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


}
