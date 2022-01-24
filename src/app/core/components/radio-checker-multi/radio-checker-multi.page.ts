import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'delphi-radio-checker-multi',
  templateUrl: './radio-checker-multi.page.html',
  styleUrls: ['./radio-checker-multi.page.scss'],
})
export class RadioCheckerMultiPage implements OnInit, OnDestroy {
  @Output() radioChange = new EventEmitter<any>();

  @Input('control')
  control: AbstractControl;
  @Input('options')
  options = [];
  @Input('maxSelectable')
  maxSelectable = 1;
  @Input('viewChange')
  viewChange: Observable<any>;
  optionsFiltered;
  searchText = '';
  selected = [];
  valSubscription: Subscription;

  ngOnInit(): void {
    this.optionsFiltered = [...this.options];
    this.valSubscription = this.viewChange.subscribe((newVal) => {
      this.addVal(newVal);
    });
  }

  addVal(newVal) {
    this.selected = this.selected.filter(v => v === newVal);
    this.selected.push(newVal);
  }

  changeVal(val) {
    this.addVal(val);
    this.radioChange.emit(this.selected);
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
