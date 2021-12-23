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

  content: string;
  onChanged;
  onTouched;

  constructor(emojiProvider: EmojiProvider) {
    this.emojiArr = emojiProvider.getEmojis();
  }

  writeValue(obj: any): void {
    this.content = obj;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
    this.setValue(this.content);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setValue(val: any): any {
    this.content += val;
    if (this.content) {
      this.onChanged(this.content);
    }
  }
}
