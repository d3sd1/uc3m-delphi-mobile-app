import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {LangService} from '../../lang/lang.service';

@Injectable()
export class LangResolver implements Resolve<any> {

  constructor(private langService: LangService) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return this.langService.init();
  }
}
