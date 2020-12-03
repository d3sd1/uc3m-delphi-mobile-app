import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProcessesPage} from './processes.page';

const routes: Routes = [
  {
    path: '',
    component: ProcessesPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessesPageRoutingModule {
}
