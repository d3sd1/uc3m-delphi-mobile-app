import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {UserStorage} from '../../core/storage/user.storage';
import {Roles} from '../../core/Roles';
import {RoleService} from './role.service';
import {Role} from '../role';

@Directive({
  selector: '[hasDelphiRole]'
})
export class RoleDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private userStorage: UserStorage,
    private viewContainer: ViewContainerRef,
    private roleService: RoleService
  ) {
  }

  roles: string[];

  @Input() set hasDelphiRole(roles: string[]) {
    this.roles = roles;
  }

  async ngOnInit() {
    const user = await this.userStorage.getUser();
    let found = false;
    user.roles.find((role: Role) => {
      this.roles.forEach((roleStr) => {
        if (role.name.toLowerCase() === roleStr.toLowerCase()) {
          found = true;
        }
      });
    });
    if (found) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
