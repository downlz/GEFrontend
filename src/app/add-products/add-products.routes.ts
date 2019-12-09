import { ManufacturerListComponent } from './add-manufacturer/manufacturer-list/manufacturer-list.component';
import { ProductDataComponent } from './products-data.component';
import { AddProductsComponent } from './add-products.component';
import { ProductTabComponent } from './product-tabs/product-tabs.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductBargainSpecifierComponnent } from './product-bargain-list/product-bargain-list.component';
// import { AddProductsRouteModule } from './add-products.routes';
import { ProductSidebarComponent } from './sidebar/sidebar.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddCityComponent } from './add-city/add-city.component';
import { AddItemnameComponent } from './add-itemname/add-itemname.component';
import { AddManufacturerComponent } from './add-manufacturer/add-manufacturer.component';
import { ManufacturerTabComponent } from './manufacturer-tabs/manufacturer-tabs.component';
import { CategoryTabComponent } from './category-tabs/category-tabs.component';
import { CityTabComponent } from './city-tabs/city-tabs.component';
import { ItemnameTabComponent } from './itemname-tabs/itemname-tabs.component';
import { AuthGuard } from './../_guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ProductDataComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'allproducts',
        component: ProductTabComponent,
        data: {
          roles: ['admin','agent','seller']
        }
      },
      {
        path: 'addProducts',
        component: AddProductsComponent ,
        data: {
         roles: ['admin', 'agent']
        }
      },
      {
        path: 'edit/:id',
        component: AddProductsComponent,
        data: {
          roles: ['admin', 'seller', 'agent']
        }
      },
      {
        path: 'bargainspecifier',
        component: ProductBargainSpecifierComponnent,
        data: {
          roles: ['admin', 'seller', 'agent']
        }
      },
      {
        path: 'additem',
        component: AddItemnameComponent ,
        data: {
         roles: ['admin', 'agent']
        }
      },
      {
        path: 'additem/edit/:id',
        component: AddItemnameComponent ,
        data: {
         roles: ['admin', 'agent']
        }
      },
      {
        path: 'allitemnames',
        component: ItemnameTabComponent,
        data: {
          roles: ['admin']
        }
      },
      {
        path: 'addcategory',
        component: AddCategoryComponent ,
        data: {
         roles: ['admin', 'agent']
        }
      },
      {
        path: 'addcategory/edit/:id',
        component: AddCategoryComponent ,
        data: {
         roles: ['admin', 'agent']
        }
      },
      {
        path: 'allcategory',
        component: CityTabComponent,
        data: {
          roles: ['admin']
        }
      },
      {
        path: 'addcity',
        component: AddCityComponent ,
        data: {
         roles: ['admin']
        }
      },
      {
        path: 'addcity/edit/:id',
        component: AddCityComponent ,
        data: {
         roles: ['admin']
        }
      },
      {
        path: 'allcity',
        component: CityTabComponent,
        data: {
          roles: ['admin']
        }
      },
      {
        path: 'addmnf',
        component: AddManufacturerComponent ,
        data: {
         roles: ['admin']
        }
      },
      {
        path: 'addmnf/edit/:id',
        component: AddManufacturerComponent ,
        data: {
         roles: ['admin']
        }
      },
      {
        path: 'allmnf',
        component: ManufacturerTabComponent,
        data: {
          roles: ['admin']
        }
      }
]}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AddProductsRouteModule { }