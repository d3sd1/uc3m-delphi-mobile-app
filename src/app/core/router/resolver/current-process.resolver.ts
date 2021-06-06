import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {Process} from '../../model/process';
import {ProcessConsumer} from '../../consumer/process/process.consumer';

@Injectable()
export class CurrentProcessResolver implements Resolve<BehaviorSubject<Process>> {
  constructor(private processService: ProcessConsumer) {
  }
  resolve(route: ActivatedRouteSnapshot): Promise<BehaviorSubject<Process>> {
    return this.processService.getById(route.params['id']);
  }
}

