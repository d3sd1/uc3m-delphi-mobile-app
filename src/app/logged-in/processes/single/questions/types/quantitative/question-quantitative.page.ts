import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Question} from '../../../../../../core/model/question';
import {Process} from '../../../../../../core/model/process';

@Component({
  selector: 'delphi-question-quantitative',
  templateUrl: './question-quantitative.page.html',
  styleUrls: ['./question-quantitative.page.scss'],
})
export class QuestionQuantitativePage {
  @Input()
  questionIdx: number;
  @Input()
  process: Process;

}
