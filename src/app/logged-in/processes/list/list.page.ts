import {Component, Input, OnInit} from '@angular/core';
import {UserStorage} from '../../../core/storage/user.storage';
import {User} from '../../user';
import {ProcessService} from '../process.service';
import {Process} from '../process';
import {CountdownConfig} from 'ngx-countdown';

@Component({
  selector: 'delphi-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  @Input() processes: Process[];
  user: User;
  currentTime: Date = new Date();

  constructor(private authService: UserStorage, private processService: ProcessService) {
  }

  async ngOnInit() {
    console.log(this.currentTime);
    console.log(this.processes);
    this.user = await this.authService.getUser();
    this.currentTime = new Date();
  }

  parseDate(date: Date): Date {
    if(typeof date !== 'object') {
      date = new Date(date);
    }
    return date;
  }
  isBeforeToday(date: Date) {
    return new Date().getTime() < this.parseDate(date).getTime();
  }

  getCountdownConfig(endTime) {
    const CountdownTimeUnits: Array<[string, number]> = [
      ['Y', 1000 * 60 * 60 * 24 * 365], // years
      ['M', 1000 * 60 * 60 * 24 * 30], // months
      ['D', 1000 * 60 * 60 * 24], // days
      ['H', 1000 * 60 * 60], // hours
      ['m', 1000 * 60], // minutes
      ['s', 1000], // seconds
      ['S', 1], // million seconds
    ];
    let configFormat: CountdownConfig = {
      stopTime: endTime,
      formatDate: ({ date, formatStr }) => {
        let duration = Number(date || 0);
        return CountdownTimeUnits.reduce((current, [name, unit]) => {
          if (current.indexOf(name) !== -1) {
            const v = Math.floor(duration / unit);
            duration -= v * unit;
            return current.replace(new RegExp(`${name}+`, 'g'), (match: string) => {
              return v.toString().padStart(match.length, '0');
            });
          }
          return current;
        }, formatStr);
      },
    };
    return configFormat;
  }
}
