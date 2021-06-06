import {Component, Input} from '@angular/core';
import {Question} from '../../../../../../core/model/question';

@Component({
  selector: 'delphi-question-catlikert',
  templateUrl: './question-catlikert.page.html',
  styleUrls: ['./question-catlikert.page.scss'],
})
export class QuestionCatlikertPage {
  @Input()
  question: Question;
}
