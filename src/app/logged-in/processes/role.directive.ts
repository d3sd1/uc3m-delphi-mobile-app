import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {UserStorage} from '../../core/storage/user.storage';
import {Roles} from '../../core/Roles';
import {RoleService} from './role.service';
import {Role} from '../role';
import {DelphiProcessUser} from './delphi-process-user';
import {FilterRole} from './filter-role';

@Directive({
  selector: '[hasDelphiRole]',

})
export class RoleDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private userStorage: UserStorage,
    private viewContainer: ViewContainerRef,
    private roleService: RoleService
  ) {
  }

  filterRole: FilterRole;
  @Input() set hasDelphiRole(filterRole:FilterRole) {
    console.log(filterRole)
    this.filterRole = filterRole;
  }

  async ngOnInit() {
    let found = false;
    console.log('current user roles: ', this.filterRole);
    // get current user
    const loggedInUser = await this.userStorage.getUser();
    const delphiProcessUser = this.filterRole?.proccessUsers?.find((delphiProcessUser) => {
      return delphiProcessUser.user.id === loggedInUser.id;
    });
    // filter
    this.filterRole.role.forEach((roleStr) => {
      if (delphiProcessUser?.role?.name.toLowerCase() === roleStr.toLowerCase()) {
        found = true;
      }
    });
    if (found) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
