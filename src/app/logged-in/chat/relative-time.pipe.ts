import { Pipe, PipeTransform } from '@angular/core';
import {distanceInWordsToNow} from 'date-fns';

@Pipe({
  name: 'relativeTime',
})
export class RelativeTime implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: Date, ...args) {
    return distanceInWordsToNow(value, { addSuffix: true });
  }
}
