import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../../../services/authentication-service';
import {User} from '../../../../../model/user';

@Component({
  selector: 'delphi-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  @Input() processes;
  processesFiltered;
  user: User;
  createProcessAvailable = false;

  constructor(private authService: AuthenticationService) {
  }

  async ngOnInit() {
    this.user = await this.authService.getUser();
    this.canCreateProcess();
    this.filterProcesses('active');
  }

  canCreateProcess() {
    this.createProcessAvailable = this.user.roles.some((role) => {
      return role.name === 'ADMIN' || role.name === 'COORDINATOR';
    });
  }

  filterProcesses(type) {
    if (typeof type === 'object') {
      type = type.detail.value;
    }
    this.processesFiltered = this.processes.filter((process) => {
      return process.status === type;
    });
  }


}
