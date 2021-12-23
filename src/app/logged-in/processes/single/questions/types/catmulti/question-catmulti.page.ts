import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../../../../core/model/question';
import {Category} from '../../../../../../core/model/category';
import {Process} from '../../../../../../core/model/process';
import {ToastController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../../environments/environment';

@Component({
  selector: 'delphi-question-catmulti',
  templateUrl: './question-catmulti.page.html',
  styleUrls: ['./question-catmulti.page.scss'],
})
export class QuestionCatmultiPage implements OnInit {
  @Input()
  question: Question;
  @Input()
  process: Process;
  currentCategory = '';


  constructor(private toastController: ToastController, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.reorderCategories();
  }


  async addCategory() {
    if (this.question.categories === undefined ||
      this.question.categories === null) {
      this.question.categories = [];
    }

    if (this.currentCategory === '') {
      await this.showToast('Introduce el nombre de la categoría');
      return;
    }

    if (this.currentCategory !== '' && this.question.categories.findIndex(c => c.catName.toLowerCase() == this.currentCategory.toLowerCase()) !== -1) {
      await this.showToast('No puedes introducir categorías duplicadas');
      this.currentCategory = '';
      return;
    }
    this.question.categories.push(new Category(this.currentCategory));
    this.currentCategory = '';
    await this.updateQuestion();
  }

  async delCategory(category: Category) {
    this.question.categories = this.question.categories.filter((cat) => {
      return category.catName !== cat.catName;
    });
    await this.updateQuestion();
  }

  async updateQuestion() {
    if (this.question.maxSelectable > this.question.categories.length) {
      this.showToast('El máximo seleccionable debe ser igual o menor que el número de categorías (' + this.question.categories.length + ')');
      this.question.maxSelectable = this.question.categories.length;
    } else if (this.question.maxSelectable == 0
      || this.question.maxSelectable === null
      || this.question.maxSelectable === undefined) {
      this.showToast('El máximo seleccionable debe ser igual o mayor a 1');
      this.question.maxSelectable = 1;
    }
    await this.httpClient.post(environment.apiUrl + '/v1/process/question/update?process_id=' + this.process.id,
      this.question).toPromise();
    this.reorderCategories();
  }

  private reorderCategories() {
    this.question.categories?.sort((n1, n2) => {
      if (n1.id < n2.id) {
        return -1;
      }
      if (n1.id > n2.id) {
        return 1;
      }
      return 0;
    });
  }

  private async showToast(msg: string) {
    const toast = await this.toastController.create({
      position: 'top',
      message: msg,
    });
    await toast.present();
    setTimeout(() => {
      toast.dismiss();
    }, 3000);
    return toast;
  }
}
