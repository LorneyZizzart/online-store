import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { StoreRoutingModule } from './store-routing.module';

const COMPONENTS = [];
const COMPONENTS_DYNAMIC = [];

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
