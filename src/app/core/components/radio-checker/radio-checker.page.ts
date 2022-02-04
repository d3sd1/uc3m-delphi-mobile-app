import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'delphi-radio-checker',
  templateUrl: './radio-checker.page.html',
  styleUrls: ['./radio-checker.page.scss'],
})
export class RadioCheckerPage implements OnInit, OnDestroy {
  @Output() radioChange = new EventEmitter<any>();

  @Input('control')
  control: AbstractControl;
  @Input('options')
  options = [];
  @Input('viewChange')
  viewChange: Observable<any>;
  optionsFiltered;
  searchText = '';
  selected;
  valSubscription: Subscription;

  ngOnInit(): void {
    this.optionsFiltered = Array.from(this.options);
    this.valSubscription = this.viewChange.subscribe((newVal) => {
      this.selected = newVal;
    });
  }

  changeVal(val) {
    this.selected = val;
    this.radioChange.emit(val);
  }

  search() {
    this.optionsFiltered = this.options.filter((opt) => {
      return opt.value.includes(this.searchText) || opt.text.includes(this.searchText);
    });
  }
  ngOnDestroy(): void {
    if (this.valSubscription && !this.valSubscription.closed) {
      this.valSubscription.unsubscribe();
    }
  }
}
