import {Component, Input} from '@angular/core';
import {Question} from '../../../../../../core/model/question';

@Component({
  selector: 'delphi-question-booltype',
  templateUrl: './question-booltype.page.html',
  styleUrls: ['./question-booltype.page.scss'],
})
export class QuestionBooltypePage {
  @Input()
  question: Question;
}
