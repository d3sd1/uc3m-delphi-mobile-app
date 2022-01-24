import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {Question} from '../../model/question';

@Component({
  selector: 'delphi-qualitative',
  templateUrl: './qualitative.page.html',
  styleUrls: ['./qualitative.page.scss'],
})
export class QualitativePage implements OnInit, OnDestroy {
  @Output() valueChange = new EventEmitter<any>();

  @Input('control')
  control: AbstractControl;
  @Input('question')
  question: Question;
  @Input('viewChange')
  viewChange: Observable<any>;
  val;

  valSubscription: Subscription;

  ngOnInit(): void {
    this.valSubscription = this.viewChange.subscribe((newVal) => {
      console.log('received val:', newVal)
      this.val = newVal;
    });
  }

  changeVal(val) {
    this.val = val;
    this.valueChange.emit(val);
  }

  ngOnDestroy(): void {
    if (this.valSubscription && !this.valSubscription.closed) {
      this.valSubscription.unsubscribe();
    }
  }

}

