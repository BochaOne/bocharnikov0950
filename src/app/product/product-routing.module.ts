import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductItemComponent } from './pages/product-item/product-item.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductLayoutComponent } from './shared/components/product-layout/product-layout.component';

const routes: Routes = [
  {
    path:'',
    component: ProductLayoutComponent,
    children: [
      {
        path:'', 
        component: ProductListComponent,
      },
      {
        path:'item/:id', 
        component: ProductItemComponent,
      },
      {
        path:'item', 
        component: ProductItemComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
