import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './list/list.component';
import { OrderViewVoucherComponent } from './view-voucher/view-voucher.component';

const routes: Routes = [{ path: '', component: OrderListComponent }, { path: 'view-voucher', component: OrderViewVoucherComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
