import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Process} from '../../../../../../core/model/process';
import {User} from '../../../../../../core/model/user';
import {ActivatedRoute} from '@angular/router';
import {Question} from '../../../../../../core/model/question';
import {UserConsumer} from '../../../../../user.consumer';
import {ProcessConsumer} from '../../../../process.consumer';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../../../../../core/service/notification.service';
import {FormBuilder, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Category} from '../../../../../../core/model/category';

@Component({
  selector: 'delphi-rounds',
  templateUrl: './modify-questions-content.page.html',
  styleUrls: ['./modify-questions-content.page.scss'],
})
export class ModifyQuestionsContentPage implements OnInit, OnDestroy {

  process: Process;
  user: User;
  question: Question;
  userSubscription: Subscription;
  processSubscription: Subscription;
  questionFormSubscription: Subscription;
  categoriesFormSubscription: Subscription;

  questionsForm = this.fb.group({
    name: ['', [Validators.required]],
    questionKind: ['', [Validators.required]],
    minVal: [0, []],
    maxVal: [10, [Validators.required]],
    orderPosition: [0, []],
    categories: [[], []],
  });
  categoriesForm = this.fb.group({
    maxSelectable: [1, []],
    options: [[], []],
    tmpInput: ['', []],
  });

  private loading: HTMLIonLoadingElement;


  constructor(
    private navCtrl: NavController,
    private userConsumer: UserConsumer,
    private ns: NotificationService,
    private fb: FormBuilder,
    private processConsumer: ProcessConsumer,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
          if (user === null) {
            return;
          }
          this.user = user;
        });

        this.processSubscription = this.processConsumer.getProcesses().subscribe((processes) => {
          if (processes == null) {
            return;
          }
          this.process = processes.find(p2 => p2.id === +params.id);
          if (this.process === undefined) {
            return;
          }
          this.question = this.process.currentRound.questions.find(q => q.id === +params.questionid);
          if (!this.question) {
            this.navCtrl.navigateBack('/logged-in/menu/processes/finished/' + this.process.id + '/question/list').then(null);
            return;
          }
          if (this.loading) {
            this.loading.dismiss().then(null);
          }
          if (this.process.currentRound.started) {
            this.setupFormsEnabled(false);
          } else {
            this.setupFormsEnabled(true);
          }
          this.categoriesForm.get('options').setValue(this.question.categories);
          this.categoriesForm.get('maxSelectable').setValue(this.question.maxSelectable);

          if (this.questionFormSubscription && !this.questionFormSubscription.closed) {
            this.questionFormSubscription.unsubscribe();
          }

          if (this.categoriesFormSubscription && !this.categoriesFormSubscription.closed) {
            this.categoriesFormSubscription.unsubscribe();
          }

          if (this.question.name !== this.questionsForm.get('name').value) {
            this.questionsForm.get('name').setValue(this.question.name);
          }

          if (this.question.questionType.name !== this.questionsForm.get('questionKind').value) {
            this.questionsForm.get('questionKind').setValue(this.question.questionType.name);
          }

          if (this.question.minVal !== this.questionsForm.get('minVal').value) {
            this.questionsForm.get('minVal').setValue(this.question.minVal);
          }
          if (this.question.maxVal !== this.questionsForm.get('maxVal').value) {
            this.questionsForm.get('maxVal').setValue(this.question.maxVal);
          }
          if (this.question.maxSelectable !== this.categoriesForm.get('maxSelectable').value) {
            this.categoriesForm.get('maxSelectable').setValue(this.question.maxSelectable);
          }
          if (this.questionsForm.get('minVal').value >= this.questionsForm.get('maxVal').value) {
            this.ns.showToast('La cota m??nima debe ser menor que la cota m??xima.');
            this.questionsForm.get('minVal').setValue(0);
            this.questionsForm.get('maxVal').setValue(10);
            return;
          }
          if (this.question.orderPosition !== this.questionsForm.get('orderPosition').value) {
            this.questionsForm.get('orderPosition').setValue(this.question.orderPosition);
          }

          this.questionFormSubscription = this.questionsForm.valueChanges.pipe(
            debounceTime(1000),
            distinctUntilChanged()
          ).subscribe((formVals) => {
            if (formVals.minVal >= formVals.maxVal) {
              this.ns.showToast('La cota m??nima debe ser menor que la cota m??xima.');
              this.questionsForm.get('minVal').setValue(0);
              this.questionsForm.get('maxVal').setValue(10);
              return;
            }
            if (!formVals.name || formVals.name === '' || formVals.name.trim().length === 0) {
              this.ns.showToast('Debes introducir el texto para la pregunta.');
              return;
            }
            this.ns.showLoading('Actualizando...', 0).then(l => {
              this.updateQuestion(formVals.name, formVals.questionKind, formVals.minVal, formVals.maxVal, formVals.orderPosition);
              this.loading = l;
            });
          });

          let prevMaxSelectable = this.categoriesForm.get('maxSelectable').value;
          this.categoriesFormSubscription = this.categoriesForm.valueChanges.pipe(
            debounceTime(1000),
            distinctUntilChanged()
          ).subscribe((formVals) => {
            if (formVals.options && formVals.options.length > 0 && (formVals.maxSelectable <= 0 || formVals.maxSelectable > formVals.options.length)) {
              this.categoriesForm.get('maxSelectable').setValue(1);
              this.ns.showToast('El valor m??ximo de selecciones debe estar comprendido entre 1 y el n??mero total de preguntas');
              return;
            }
            if (formVals.options.length === 0) {
              this.ns.showAlert('Error', 'Debes introducir al menos una categor??a.', 'OK');
              return;
            }
            if (formVals.maxSelectable !== prevMaxSelectable) {
              this.ns.showLoading('Modificando cotas...', 0).then(l => {
                prevMaxSelectable = formVals.maxSelectable;
                this.loading = l;
                this.processConsumer.updateQuestionCategories(this.process.id, this.question.id, formVals.options, this.categoriesForm.get('maxSelectable').value);
              });
            } else {
              this.processConsumer.updateQuestionCategories(this.process.id, this.question.id, formVals.options, this.categoriesForm.get('maxSelectable').value);
            }

          });
        });
      });
  }

  setupFormsEnabled(active: boolean) {
    if (active) {
      this.questionsForm.get('name').enable();
      this.questionsForm.get('questionKind').enable();
      this.questionsForm.get('minVal').enable();
      this.questionsForm.get('maxVal').enable();
      this.questionsForm.get('orderPosition').enable();
      this.questionsForm.get('categories').enable();
      this.categoriesForm.get('maxSelectable').enable();
      this.categoriesForm.get('maxSelectable').enable();
      this.categoriesForm.get('tmpInput').enable();
    } else {
      this.questionsForm.get('name').disable();
      this.questionsForm.get('questionKind').disable();
      this.questionsForm.get('minVal').disable();
      this.questionsForm.get('maxVal').disable();
      this.questionsForm.get('orderPosition').disable();
      this.questionsForm.get('categories').disable();
      this.categoriesForm.get('maxSelectable').disable();
      this.categoriesForm.get('maxSelectable').disable();
      this.categoriesForm.get('tmpInput').disable();
    }
  }

  isCategoryNameInvalid() {
    return this.categoriesForm.get('tmpInput').value === ''
      || this.categoriesForm.get('tmpInput').value.trim().length === 0;
  }

  addCategory() {
    if (this.isCategoryNameInvalid()) {
      this.ns.showToast('Debes introducir un nombre para la categor??a.');
      return;
    }

    if (this.categoriesForm.get('options').value.some(co => co.catName.toLowerCase() === this.categoriesForm.get('tmpInput').value.toLowerCase())) {
      this.ns.showAlert('Error', 'No se admiten categor??as duplicadas.', 'OK');
      this.categoriesForm.get('tmpInput').setValue('');
      return;
    }

    this.ns.showLoading('A??adiendo categor??a...', 0).then(l => {
      this.loading = l;
      this.categoriesForm.get('options').value.push(new Category(this.categoriesForm.get('tmpInput').value));
      this.categoriesForm.get('tmpInput').setValue('');
      this.loading.dismiss();
    });
  }

  delCategory(c: Category) {
    this.ns.showLoading('Eliminando categor??a...', 0).then(l => {
      this.loading = l;
      this.categoriesForm.get('options').value.push(new Category(this.categoriesForm.get('tmpInput').value));
      this.categoriesForm.get('tmpInput').setValue('');
      this.loading.dismiss();
    });
    this.categoriesForm.get('options').setValue(this.categoriesForm.get('options').value.filter(c2 => c.id !== c2.id));
  }


  updateQuestion(name: string, questionKind: string, minVal: number, maxVal: number, orderPosition: number) {
    this.processConsumer.updateQuestion(this.process.id, this.question.id,
      name, questionKind, minVal, maxVal, orderPosition);
  }

  ngOnDestroy(): void {
    this.ns.removeAlert();
    if (this.userSubscription && !this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
    if (this.processSubscription && !this.processSubscription.closed) {
      this.processSubscription.unsubscribe();
    }
    if (this.questionFormSubscription && !this.questionFormSubscription.closed) {
      this.questionFormSubscription.unsubscribe();
    }
    if (this.categoriesFormSubscription && !this.categoriesFormSubscription.closed) {
      this.categoriesFormSubscription.unsubscribe();
    }
    this.process = undefined;
    this.user = undefined;
    this.question = undefined;
    this.questionsForm.reset();
    this.categoriesForm.reset();
    if (this.loading) {
      this.loading.dismiss().then(null);
    }
    this.ns.removeAlert();
  }

  deleteConfirmation() {
    this.ns.showAlert('Confirmaci??n', '??Seguro que deseas eliminar la pregunta?', 'Cancelar', {
      text: 'Eliminar',
      handler: () => {
        this.ns.removeAlert();
        this.removeQuestion();
      }
    }, null, 'Esta acci??n NO es revertible y se perder?? dicha informaci??n.');
  }

  removeQuestion() {
    if (!this.process || this.process.finished || !this.process.currentRound || this.process.currentRound.finished) {
      this.ns.showAlert('Error', 'Proceso o ronda finalizado', 'OK', null, null, 'No puedes eliminar preguntas de un proceso o ronda finalizado.');
    }

    this.ns.showLoading('Eliminando pregunta...', 0).then(l => {
      this.loading = l;
      this.processConsumer.deleteQuestion(this.process.id, this.question.id);
    });
  }


}

