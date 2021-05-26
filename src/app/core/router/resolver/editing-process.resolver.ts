import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {ProcessConsumer} from '../../consumer/process/process.consumer';
import {BehaviorSubject} from 'rxjs';
import {Process} from '../../../logged-in/processes/process';
import {EditingProcessConsumer} from '../../consumer/process/editing-process.consumer';

@Injectable()
export class EditingProcessResolver implements Resolve<BehaviorSubject<Process>> {

  constructor(private editingProcessConsumer: EditingProcessConsumer) {}

  resolve(route: ActivatedRouteSnapshot): Promise<BehaviorSubject<Process>> {
    return this.editingProcessConsumer.getProcess();
  }
}
