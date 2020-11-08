import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaleListComponent } from './list/list.component';

const routes: Routes = [{ path: '', component: SaleListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }
