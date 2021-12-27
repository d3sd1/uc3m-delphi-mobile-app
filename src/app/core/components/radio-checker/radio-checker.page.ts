import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'delphi-radio-checker',
  templateUrl: './radio-checker.page.html',
  styleUrls: ['./radio-checker.page.scss'],
})
export class RadioCheckerPage implements OnInit {
  @Input('control')
  control: AbstractControl;
  @Input('options')
  options = [];
  optionsFiltered;
  searchText = '';

  ngOnInit(): void {
    this.optionsFiltered = [...this.options];
  }

  search() {
    this.optionsFiltered = this.options.filter((opt) => {
      return opt.value.includes(this.searchText) || opt.text.includes(this.searchText);
    });
  }
}
