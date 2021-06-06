import {Component, Input} from '@angular/core';
import {Question} from '../../../../../../core/model/question';

@Component({
  selector: 'delphi-question-quantitative',
  templateUrl: './question-quantitative.page.html',
  styleUrls: ['./question-quantitative.page.scss'],
})
export class QuestionQuantitativePage {
  @Input()
  question: Question;
}
