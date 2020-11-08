import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreListComponent } from './list/list.component';
import { StoreHomeComponent } from './home/home.component';
import { StoreAdminComponent } from './admin/admin.component';

const routes: Routes = [  
  { path: '', 
    component: StoreHomeComponent,
    children: [
      { path: '', component: StoreListComponent },
    ]
  },
  { path: 'list', 
    component: StoreAdminComponent, 
    children: [
      { path: '', 
        component: StoreHomeComponent,
        children: [
          { path: '', component: StoreListComponent },
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
