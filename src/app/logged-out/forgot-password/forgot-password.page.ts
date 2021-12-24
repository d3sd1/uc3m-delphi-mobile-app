import {Component, OnDestroy} from '@angular/core';
import {NavController} from '@ionic/angular';
import {UserConsumer} from '../../logged-in/user.consumer';
import {FormBuilder, Validators} from '@angular/forms';
import {NotificationService} from '../../core/service/notification.service';

@Component({
  selector: 'delphi-login',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnDestroy {
  recoverForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private userConsumer: UserConsumer,
              public ns: NotificationService,
              private navCtrl: NavController,
              private fb: FormBuilder) {
  }


  confirmCode() {
    this.ns.showAlert(
      'Recuperación recibida',
      'Revisa tu buzón de correo electrónico',
      null,
      'Cancelar',
      [
        {
          type: 'text',
          placeholder: 'Código de recuperación',
          attributes: {
            maxlength: 6,
            inputmode: 'decimal',
            autoFocus: true,
            onInput: (ev) => {
              const code = (ev.target as HTMLInputElement).value;
              if (code.length === 6) {
                this.ns.showLoading('Cargando...').then((loading) => {
                  this.userConsumer.resetPassword(this.recoverForm.get('email').value, +code).then(() => {
                    loading.dismiss().then(null);
                    this.ns.removeAlert();
                    this.displaySuccess();
                  }, () => {
                    loading.dismiss().then(null);
                    this.ns.removeAlert();
                    this.displayError();
                  });
                });
              }
            },
          },
        },
      ]
    );
  }

  displaySuccess() {
    this.recoverForm.reset();
    this.navCtrl.navigateBack('/logged-out/login').then(() => this.ns.showAlert('Contraseña reseteada',
      'Se ha enviado tu nueva contraseña por correo electrónico.',
      'Entendido',
      null
    ));
  }

  displayError() {
    this.recoverForm.reset();
    this.ns.showAlert('Fallo en el reseteo',
      'El código introducido no es correcto.',
      'Entendido',
      null
    );
  }

  recover() {
    this.ns.showLoading('Cargando...').then((loading) => {
      this.userConsumer.recoverPassword(this.recoverForm.get('email').value).then(() => {
        this.confirmCode();
      });
    });
  }

  ngOnDestroy(): void {
    this.recoverForm.reset();
  }


}
