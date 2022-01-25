import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {NotificationService} from '../../service/notification.service';

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

  constructor(private ns: NotificationService) {
  }

  ngOnInit(): void {
    this.optionsFiltered = [...this.options];
    this.valSubscription = this.viewChange.subscribe((newVal) => {
      if (newVal && newVal.includes(';')) {
        this.parseVals(newVal);
      }
    });
  }

  isSelected(val): boolean {
    return this.selected.includes(parseInt(val, 10)) || this.selected.includes(String(val));
  }

  parseVals(encodedVals) {
    this.selected = encodedVals.split(';');
    this.selected = this.selected.filter(v => v && v !== '');
  }

  addVal(newVal) {
    if (this.isSelected(newVal)) {
      this.removeVal(newVal);
    } else {
      if (this.selected.length >= this.maxSelectable) {
        this.ns.showAlert('Error', 'El máximo de selecciones es de ' + this.maxSelectable, 'OK');
        return;
      }
      if (!newVal) {
        return;
      }
      this.removeVal(newVal);
      this.selected.push(newVal);
    }
  }

  removeVal(val) {
    this.selected = this.selected.filter(v => v !== parseInt(val, 10) && v !== String(val));
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
