import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {Process} from '../../model/process';
import {EditingProcessConsumer} from '../../consumer/process/editing-process.consumer';

@Injectable()
export class EditingProcessResolver implements Resolve<BehaviorSubject<Process>> {

  constructor(private editingProcessConsumer: EditingProcessConsumer) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<BehaviorSubject<Process>> {
    return this.editingProcessConsumer.getProcess();
  }
}
