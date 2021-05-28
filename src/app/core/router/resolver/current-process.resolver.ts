import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {Process} from '../../model/process';
import {CurrentProcessConsumer} from '../../consumer/process/current-process.consumer';

@Injectable()
export class CurrentProcessResolver implements Resolve<BehaviorSubject<Process>> {

  constructor(private editingProcessConsumer: CurrentProcessConsumer) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<BehaviorSubject<Process>> {
    return this.editingProcessConsumer.getProcess();
  }
}

