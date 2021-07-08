import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductItemComponent } from './pages/product-item/product-item.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductLayoutComponent } from './shared/components/product-layout/product-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterCategoriesPipe } from './shared/pipes/filter-categories.pipe';


@NgModule({
  declarations: [
    ProductItemComponent,
    ProductListComponent,
    ProductLayoutComponent,
    FilterCategoriesPipe
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProductModule { }
