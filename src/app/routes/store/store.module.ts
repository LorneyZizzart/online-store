import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { StoreRoutingModule } from './store-routing.module';
import { StoreListComponent } from './list/list.component';
import { StoreHomeComponent } from './home/home.component';
import { StoreAdminComponent } from './admin/admin.component';
import { StoreOrderComponent } from './order/order.component';

const COMPONENTS = [StoreListComponent, StoreHomeComponent, StoreAdminComponent];
const COMPONENTS_DYNAMIC = [StoreOrderComponent];

@NgModule({
  imports: [
    SharedModule,
    StoreRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class StoreModule { }
