import { CategoryService } from './services/category.service';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {ListingsComponent} from './listings/listings.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {LoginComponent} from './login/login.component';
import {OrderNowComponent} from './order-now/order-now.component';
import {BargainOrderComponent} from './bargain-order/bargain-order.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {AllOrdersComponent} from './all-orders/all-orders.component';
import {RegistrationComponent} from './users/registration/registration.component';
import {ReferUserComponent} from './users/refer-user/refer-user.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {AuthGuard} from './_guards/auth.guard';
import { BargainRequestComponent } from './bargain-request/bargain-request.component';
import { BargainQuoteComponent } from './bargain-quote/bargain-quote.component';
import { CreateOrderComponent } from './agent-mgmt/create-order/create-order.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgotpassword',
    loadChildren: '../app/login/forgot-password/forgot-password.module#ForgotPasswordModule'
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
    path:'termsofuse',
    // component: TermsUseComponent
    loadChildren: '../app/terms-use/terms-use.module#TermsConditionModule'
  },
  {
    path: 'products',
    // loadChildren: '../app/products/products-list.module#AppProductsListModule'
    component: ListingsComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
  path: 'product',
  loadChildren: '../app/add-products/add-products.module#AppProductsModule'
  },
  {
    path: 'createorder',
    component: CreateOrderComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin','agent']
    }
  },
  {
    path: 'auction',
    loadChildren: '../app/auction/auction.module#AuctionModule',
  },
  {
    path: 'transport',
    loadChildren: '../app/transport/transport.module#TransportModule'
  },
  { 
    path: 'groupbuy',
    loadChildren: '../app/group-buy/group-buy.module#GroupBuyModule'
  },
  // Added 16022020
  {
    path: 'product/:id',
    component: ProductDetailComponent,
    canActivate: [AuthGuard],
    data: {roles: ['admin', 'buyer', 'seller','agent']}
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
    path: 'myOrders',
    component: MyOrdersComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'buyer','agent']
    }
  },
  {
    path: 'allOrders',
    component: AllOrdersComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin','seller']
    }
  },
  {
    path: 'bargainOrder/:id',
    component: BargainOrderComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin','seller','buyer']
    }
  },
  {
    path: 'bargainQuote/:id',
    component: BargainQuoteComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin','seller','buyer']
    }
  },
  {
    path: 'bargainRequest',
    component: BargainRequestComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin','seller','buyer']
    }
  },
  {
    path: 'referral',
    component: ReferUserComponent
  },
  {
    path: 'users/usersmgmt',
    loadChildren: '../app/users/user-mgmt/user-mgmt.module#UserMgmtModule'
  },
  {
    path: 'credit',
    loadChildren: '../app/credit/credit.module#CreditModule'
  },
  {
    path: '**',
    component: LandingPageComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],    //{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
