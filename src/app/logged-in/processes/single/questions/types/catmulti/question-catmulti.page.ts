import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../../../../core/model/question';
import {Category} from '../../../../../../core/model/category';
import {Process} from '../../../../../../core/model/process';
import {NotificationService} from '../../../../../../core/service/notification.service';

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


  constructor(private ns: NotificationService) {
  }

  ngOnInit(): void {
    this.reorderCategories();
  }


  addCategory() {
    if (this.question.categories === undefined ||
      this.question.categories === null) {
      this.question.categories = [];
    }

    if (this.currentCategory === '') {
      this.ns.showToast('Introduce el nombre de la categoría');
      return;
    }

    if (this.currentCategory !== '' && this.question.categories.findIndex(c => c.catName.toLowerCase() == this.currentCategory.toLowerCase()) !== -1) {
      this.ns.showToast('No puedes introducir categorías duplicadas');
      this.currentCategory = '';
      return;
    }
    this.question.categories.push(new Category(this.currentCategory));
    this.currentCategory = '';
    this.updateQuestion();
  }

  delCategory(category: Category) {
    this.question.categories = this.question.categories.filter((cat) => {
      return category.catName !== cat.catName;
    });
    this.updateQuestion();
  }

  updateQuestion() {
    if (this.question.maxSelectable > this.question.categories.length) {
      this.ns.showToast('El máximo seleccionable debe ser igual o menor que el número de categorías (' + this.question.categories.length + ')');
      this.question.maxSelectable = this.question.categories.length;
    } else if (this.question.maxSelectable == 0
      || this.question.maxSelectable === null
      || this.question.maxSelectable === undefined) {
      this.ns.showToast('El máximo seleccionable debe ser igual o mayor a 1');
      this.question.maxSelectable = 1;
    }
    /*
    await this.httpClient.post(environment.apiUrl + '/v1/process/question/update?process_id=' + this.process.id,
      this.question).toPromise();*/
    this.reorderCategories();
  }

  private reorderCategories() {
    if(!this.question || !this.question.categories) {
      return;
    }
    this.question.categories.sort((n1, n2) => {
      if (n1.id < n2.id) {
        return -1;
      }
      if (n1.id > n2.id) {
        return 1;
      }
      return 0;
    });
  }

}
