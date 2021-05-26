import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {CompatibilityService} from '../../devices/compatibility.service';

@Injectable()
export class CompatibilityResolver implements Resolve<any> {

  constructor(private compatibilityService: CompatibilityService) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return this.compatibilityService.checkDevice();
  }
}
