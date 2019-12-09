import { ProductDataComponent } from './products-data.component';
import { AddProductsComponent } from './add-products.component';
import { ProductTabComponent } from './product-tabs/product-tabs.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductBargainSpecifierComponnent } from './product-bargain-list/product-bargain-list.component';
import { ManufacturerTabComponent } from './manufacturer-tabs/manufacturer-tabs.component';
import { AddProductsRouteModule } from './add-products.routes';
import { ProductSidebarComponent } from './sidebar/sidebar.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddCityComponent } from './add-city/add-city.component';
import { AddItemnameComponent } from './add-itemname/add-itemname.component';
import { AddManufacturerComponent } from './add-manufacturer/add-manufacturer.component';
import { CategoryTabComponent } from './category-tabs/category-tabs.component';
import { CityTabComponent } from './city-tabs/city-tabs.component';
import { ItemnameTabComponent } from './itemname-tabs/itemname-tabs.component';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FileUploadModule} from 'ng2-file-upload';
import { ManufacturerListComponent } from './add-manufacturer/manufacturer-list/manufacturer-list.component';

@NgModule({
  declarations: [AddProductsComponent,ProductTabComponent,ProductListComponent,ProductBargainSpecifierComponnent,ManufacturerTabComponent,
    ProductSidebarComponent,AddCategoryComponent,AddCityComponent,AddItemnameComponent,AddManufacturerComponent,
    CategoryTabComponent,CityTabComponent,ItemnameTabComponent,ProductDataComponent,ManufacturerListComponent],
  imports: [
    CommonModule,RouterModule,
    FormsModule, ReactiveFormsModule, NgbModule,FileUploadModule, AddProductsRouteModule
  ]
})
export class AppProductsModule { }