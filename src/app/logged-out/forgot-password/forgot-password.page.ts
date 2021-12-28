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
    code: ['', []],
    newPass: ['', []],
    newPassRep: ['', []],
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
                this.recoverForm.get('code').setValue(code);
                this.ns.removeAlert();
                this.setNewPassword();
              }
            },
          },
        },
      ]
    );
  }

  setNewPassword() {
    this.ns.showAlert(
      'Nueva contraseña',
      'Introduce tu nueva contraseña',
      {
        text: 'Confirmar',
        handler: () => {
          if (this.recoverForm.get('newPass').value !== this.recoverForm.get('newPassRep').value) {
            this.ns.showToast('Las nuevas contraseñas no coinciden.');
            this.recoverForm.get('newPass').setValue('');
            this.recoverForm.get('newPassRep').setValue('');
            return;
          }
          this.ns.showLoading('Cargando...').then((loading) => {
            this.userConsumer.resetPassword(this.recoverForm.get('email').value, +this.recoverForm.get('code').value, this.recoverForm.get('newPass').value, this.recoverForm.get('newPassRep').value).then(() => {
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
      'Cancelar',
      [
        {
          type: 'password',
          placeholder: 'Nueva contraseña',
          attributes: {
            maxlength: 50,
            autoFocus: true,
            onInput: (ev) => {
              this.recoverForm.get('newPass').setValue((ev.target as HTMLInputElement).value);
            },
          },
        },
        {
          type: 'password',
          placeholder: 'Repite la nueva contraseña',
          attributes: {
            maxlength: 50,
            autoFocus: true,
            onInput: (ev) => {
              this.recoverForm.get('newPassRep').setValue((ev.target as HTMLInputElement).value);
            },
          },
        },
      ]
    );
  }

  displaySuccess() {
    this.recoverForm.reset();
    this.navCtrl.navigateBack('/logged-out/login').then(() => {
      this.ns.showAlert('Contraseña reseteada',
        'Ya puedes usar tu nueva contraseña para conectarte.',
        'Entendido',
        null
      );
      this.ngOnDestroy();
    });
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
    if(this.recoverForm) {
      this.recoverForm.reset();
    }
  }


}
