import { NgModule } from '@angular/core';
import { SaleListComponent } from './list/list.component';
import { SharedModule } from '@shared/shared.module';
import { SaleRoutingModule } from './sale-routing.module';

const COMPONENTS = [SaleListComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    SaleRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class SaleModule { }
