import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ListingsComponent } from './listings/listings.component';
import { GBListingsComponent } from './gblistings/gblistings.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { GBProductDetailComponent } from './gbproduct-detail/gbproduct-detail.component';
import { LoginComponent } from './login/login.component';
import { OrderNowComponent } from './order-now/order-now.component';
import { GBOrderNowComponent } from './gborder-now/gborder-now.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { GroupBuyingComponent } from './group-buying/group-buying.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { ListGBItemComponent } from './listgb-item/listgb-item.component';
import { RegistrationComponent } from './registration/registration.component';
import { ReferUserComponent } from './refer-user/refer-user.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthGuard } from './_guards/auth.guard';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'main',
    component: LandingPageComponent
  },
  {
    path: 'errorpage',
    component: ErrorPageComponent
  },
  {
    path: 'products',
    component: ListingsComponent
  },
  {
    path: 'gbproducts',
    component: GBListingsComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'addProducts',
    component: AddProductsComponent
  },
  {
    path: 'listgbItem',
    component: ListGBItemComponent
  },
  {
    path: 'groupBuying',
    component: GroupBuyingComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin']
    }
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'buyer']}
  },
  {
    path: 'gbproduct/:id',
    component: GBProductDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'buyer']}
  },
  {
    path: 'orderNow/:id',
    component: OrderNowComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'buyer']
    }
  },
  {
    path: 'gborderNow/:id',
    component: GBOrderNowComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'buyer']
    }
  },
  {
    path: 'myOrders',
    component: MyOrdersComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'buyer']
    }
  },
  {
    path: 'allOrders',
    component: AllOrdersComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin']
    }
  },
  {
    path: 'referral',
    component: ReferUserComponent
  },
  {
    path: '**',
    component: LandingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
