import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { StoreRoutingModule } from './store-routing.module';
import { StoreListComponent } from './list/list.component';

const COMPONENTS = [StoreListComponent];
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
