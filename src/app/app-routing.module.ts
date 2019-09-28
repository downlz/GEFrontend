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

import {AddProductsComponent} from './add-products/add-products.component';
import {ProductSidebarComponent} from './add-products/sidebar/sidebar.component';
import {ProductDataComponent} from './add-products/products-data.component';
// import {GBListingsComponent} from './gblistings/gblistings.component';
// import {ListGBItemComponent} from './listgb-item/listgb-item.component';
// import {GBProductDetailComponent} from './gbproduct-detail/gbproduct-detail.component';
// import {GBOrderNowComponent} from './gborder-now/gborder-now.component';
// import {GroupBuyingComponent} from './group-buying/group-buying.component';

import {RegistrationComponent} from './users/registration/registration.component';
import {ReferUserComponent} from './users/refer-user/refer-user.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {TermsUseComponent} from './terms-use/terms-use.component';
import {AuthGuard} from './_guards/auth.guard';

// import {AuctionComponent} from './auction/auction.component';
// import {CreateAuctionComponent} from './auction/create-auction/create-auction.component';
// import {AuctionListComponent} from './auction/auction-list/auction-list.component';
// import {AuctionStatusComponent} from './auction/auction-status/auction-status.component';
// import {AuctionDetailComponent} from './auction/auction-detail/auction-detail.component';
// import {MyBidsComponent} from './auction/my-bids/my-bids.component';

// import {TransportComponent} from './transport/transport.component';
// import {ListTransportRateComponent} from './transport/list-transport-rate/list-transport-rate.component';
// import { DispatchDetailComponent } from './transport/dispatch-detail/dispatch-detail.component';
// import { TransportRateComponent } from './transport/transport-rate/transport-rate.component';
// import { DispatchHistoryComponent } from './transport/dispatch-history/dispatch-history.component';
// import { DispatchOrderComponent } from './transport/dispatch-order/dispatch-order.component';
// import { FindTransportComponent } from './transport/find-transport/find-transport.component';

// import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { BargainRequestComponent } from './bargain-request/bargain-request.component';
import { BargainQuoteComponent } from './bargain-quote/bargain-quote.component';

import { CreateOrderComponent } from './agent-mgmt/create-order/create-order.component';
import { ProductTabComponent } from './add-products/product-tabs/product-tabs.component';
// import { AddUsersComponent } from './add-products/add-users/add-users.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  // ...ForgotPasswordRoutes,
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
    component: TermsUseComponent
  },
  {
    path: 'products',
    component: ListingsComponent
  },
  // {
  //   path: 'gbproducts',
  //   component: GBListingsComponent,
  // },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
  path: 'product',
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
    }
    // ,
    // {
    //   path: 'addusers',
    //   component: AddUsersComponent,
    //   data: {
    //     roles: ['admin', 'agent']
    //   }
    // }
  ],
  data: {
    roles: ['admin', 'agent','seller']
  }
  },
  // {
  //   path: 'listgbItem',
  //   component: ListGBItemComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     roles: ['admin']
  //   }
  // },
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
    // component: AuctionComponent,
    // canActivate: [AuthGuard],
    // children: [
    //   {
    //     path: '',
    //     component: AuctionListComponent,
    //     data: {
    //       roles: ['admin', 'seller', 'buyer']
    //     }
    //   },
    //   {
    //     path: 'add',
    //     component: CreateAuctionComponent,
    //     data: {
    //      // roles: ['admin', 'seller', 'buyer']
    //     }
    //   },
    //   {
    //     path: 'edit/:id',
    //     component: CreateAuctionComponent,
    //     data: {
    //       roles: ['admin', 'seller', 'buyer']
    //     }
    //   },
    //   {
    //     path: 'status',
    //     component: AuctionStatusComponent,
    //     data: {
    //       roles: ['admin', 'seller']
    //     }
    //   },
    //   {
    //     path: 'bids',
    //     component: MyBidsComponent,
    //     data: {
    //       roles: ['buyer', 'seller']
    //     }
    //   },
    //   {
    //     path: 'active',
    //     component: AuctionListComponent,
    //     data: {
    //       roles: ['buyer', 'seller']
    //     }
    //   },
    //   {
    //     path: 'inactive',
    //     component: AuctionListComponent,
    //     data: {
    //       roles: ['buyer', 'seller']
    //     }
    //   },
    //   {
    //     path: ':id',
    //     component: AuctionDetailComponent
    //   }
    // ],
    // data: {
    //   roles: ['admin', 'buyer', 'seller']
    // }
  },
  {
    path: 'transport',
    loadChildren: '../app/transport/transport.module#TransportModule'
  },
  { 
    path: '',
    loadChildren: '../app/group-buy/group-buy.module#GroupBuyModule'
  },
  // {
  //   path: 'groupBuying',
  //   component: GroupBuyingComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     roles: ['admin']
  //   }
  // },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
    canActivate: [AuthGuard],
    data: {roles: ['admin', 'buyer', 'seller','agent']}
  },
  // {
  //   path: 'gbproduct/:id',
  //   component: GBProductDetailComponent,
  //   canActivate: [AuthGuard],
  //   data: {roles: ['admin', 'buyer', 'seller']}
  // },
  {
    path: 'orderNow/:id',
    component: OrderNowComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'buyer']
    }
  },
  // {
  //   path: 'gborderNow/:id',
  //   component: GBOrderNowComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     roles: ['admin', 'buyer']
  //   }
  // },
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
    path: '**',
    component: LandingPageComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
