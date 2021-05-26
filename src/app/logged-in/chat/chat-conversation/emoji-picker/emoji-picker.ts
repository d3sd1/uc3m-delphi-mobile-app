import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {EmojiProvider} from './emoji-provider';

export const EMOJI_PICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EmojiPickerComponent),
  multi: true
};

@Component({
  selector: 'emoji-picker',
  providers: [EMOJI_PICKER_VALUE_ACCESSOR],
  templateUrl: './emoji-picker.html',
  styleUrls: ['./emoji-picker.scss']
})
export class EmojiPickerComponent implements ControlValueAccessor {

  emojiArr = [];

  _content: string;
  _onChanged: Function;
  _onTouched: Function;

  constructor(emojiProvider: EmojiProvider) {
    this.emojiArr = emojiProvider.getEmojis();
  }

  writeValue(obj: any): void {
    this._content = obj;
  }

  registerOnChange(fn: any): void {
    this._onChanged = fn;
    this.setValue(this._content);
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  public setValue(val: any): any {
    this._content += val;
    if (this._content) {
      this._onChanged(this._content);
    }
  }
}
