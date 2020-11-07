import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './list/list.component';
import { ProductsListOptionsComponent } from './list/options/options.component';

const COMPONENTS = [ProductsListComponent];
const COMPONENTS_DYNAMIC = [ProductsListOptionsComponent];

@NgModule({
  imports: [
    SharedModule,
    ProductsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class ProductsModule { }
