import {Component, Input} from '@angular/core';
import {Question} from '../../../../../../core/model/question';
import {Process} from '../../../../../../core/model/process';

@Component({
  selector: 'delphi-question-catlikert',
  templateUrl: './question-catlikert.page.html',
  styleUrls: ['./question-catlikert.page.scss'],
})
export class QuestionCatlikertPage {
  @Input()
  questionIdx: number;
  @Input()
  process: Process;
}
