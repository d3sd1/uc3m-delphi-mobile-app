import {Component, OnDestroy} from '@angular/core';
import {NavController} from '@ionic/angular';
import {UserConsumer} from '../../logged-in/user.consumer';
import {FormBuilder, Validators} from '@angular/forms';
import {NotificationService} from '../../core/service/notification.service';

@Component({
  selector: 'delphi-login',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnDestroy {
  recoverForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    surnames: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(private userConsumer: UserConsumer,
              public ns: NotificationService,
              private navCtrl: NavController,
              private fb: FormBuilder) {
  }

  displaySuccess() {
    this.ns.showLoading('Cuenta registrada. Cargando usuario...', 1500).then((l) => {
      setTimeout(() => {
        this.userConsumer.doLogin(this.recoverForm.value).then((sucMessage: string) => {
          this.navCtrl.navigateForward('/logged-in').then(() => {
            this.ns.removeAlert();
            this.ns.showToast(sucMessage);
            this.ngOnDestroy();
          });
        }).catch((errMessage: string) => {
          this.ns.showToast(errMessage);
          this.navCtrl.navigateForward('/logged-out/login').then(() => {
          });
        });
      }, 1500);
    });

  }

  displayError(e) {
    this.recoverForm.reset();
    this.ns.showAlert('Fallo en el registro',
      'El email introducido está en uso.',
      'Solucionar',
      null
    );
  }

  register() {
    this.ns.showLoading('Cargando...').then((loading) => {
      this.userConsumer.register(this.recoverForm.get('email').value,
        this.recoverForm.get('name').value,
        this.recoverForm.get('surnames').value,
        this.recoverForm.get('password').value).then(() => {
        this.displaySuccess();
      }, (e) => {
        this.displayError(e);
      }).catch((e) => {
        console.log(e);
        this.displayError(e);
      });
    });
  }

  ngOnDestroy(): void {
    if (this.recoverForm) {
      this.recoverForm.reset();
    }
  }


}
