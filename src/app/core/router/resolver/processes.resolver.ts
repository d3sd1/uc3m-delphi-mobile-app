import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {ProcessConsumer} from '../../consumer/process/process.consumer';
import {BehaviorSubject} from 'rxjs';
import {Process} from '../../model/process';

@Injectable()
export class ProcessesResolver implements Resolve<BehaviorSubject<Process[]>> {

  constructor(private processService: ProcessConsumer) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<BehaviorSubject<Process[]>> {
    return this.processService.all();
  }
}
