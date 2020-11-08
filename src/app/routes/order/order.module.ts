import { NgModule } from '@angular/core';
import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from '@shared/shared.module';
import { OrderListComponent } from './list/list.component';
import { OrderViewVoucherComponent } from './view-voucher/view-voucher.component';

const COMPONENTS = [OrderListComponent, OrderViewVoucherComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    OrderRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class OrderModule { }
