import {Component, Input} from '@angular/core';
import {Process} from '../../../../../../core/model/process';
import {Question} from '../../../../../../core/model/question';
import {NotificationService} from '../../../../../../core/service/notification.service';

@Component({
  selector: 'delphi-question-quantitative',
  templateUrl: './question-quantitative.page.html',
  styleUrls: ['./question-quantitative.page.scss'],
})
export class QuestionQuantitativePage {
  @Input()
  question: Question;
  @Input()
  process: Process;


  constructor(private ns: NotificationService) {
  }

  updateQuestion() {
    if (this.question.minVal >= this.question.maxVal) {
      this.ns.showToast('El valor máximo debe ser mayor que el valor mínimo.');
      return;
    }
  }
}

