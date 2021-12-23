import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../../../../core/model/question';
import {Category} from '../../../../../../core/model/category';
import {Process} from '../../../../../../core/model/process';
import {ToastController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../../../../../core/service/notification.service';

@Component({
  selector: 'delphi-question-catcustom',
  templateUrl: './question-catcustom.page.html',
  styleUrls: ['./question-catcustom.page.scss'],
})
export class QuestionCatcustomPage implements OnInit {
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
    //  await this.httpClient.post(environment.apiUrl + '/v1/process/question/update?process_id=' + this.process.id,
    //  this.process.currentRound.questions[this.questionIdx]).toPromise();
    //this.reorderCategories();
  }

  delCategory(category: Category) {
    //  this.process.currentRound.questions[this.questionIdx].categories = this.process.currentRound.questions[this.questionIdx].categories.filter((cat) => {
    //  return category.catName !== cat.catName;
    //});
    //  await this.httpClient.post(environment.apiUrl + '/v1/process/question/update?process_id=' + this.process.id,
    //  this.process.currentRound.questions[this.questionIdx]).toPromise();
    //this.reorderCategories();
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
