import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {ListingsComponent} from './listings/listings.component';
import {GBListingsComponent} from './gblistings/gblistings.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {GBProductDetailComponent} from './gbproduct-detail/gbproduct-detail.component';
import {LoginComponent} from './login/login.component';
import {OrderNowComponent} from './order-now/order-now.component';
import {BargainOrderComponent} from './bargain-order/bargain-order.component';
import {GBOrderNowComponent} from './gborder-now/gborder-now.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {AllOrdersComponent} from './all-orders/all-orders.component';
import {GroupBuyingComponent} from './group-buying/group-buying.component';
import {AddProductsComponent} from './add-products/add-products.component';
import {ListGBItemComponent} from './listgb-item/listgb-item.component';
import {RegistrationComponent} from './registration/registration.component';
import {ReferUserComponent} from './refer-user/refer-user.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {AuthGuard} from './_guards/auth.guard';

import {AuctionComponent} from './auction/auction.component';
import {CreateAuctionComponent} from './auction/create-auction/create-auction.component';
import {AuctionListComponent} from './auction/auction-list/auction-list.component';
import {AuctionStatusComponent} from './auction/auction-status/auction-status.component';
import {AuctionDetailComponent} from './auction/auction-detail/auction-detail.component';
import {MyBidsComponent} from './auction/my-bids/my-bids.component';

import {TransportComponent} from './transport/transport.component';
import {ListTransportRateComponent} from './transport/list-transport-rate/list-transport-rate.component';
// import { DispatchDetailComponent } from './transport/dispatch-detail/dispatch-detail.component';
import { DispatchDetailComponent } from './transport/dispatch-detail/dispatch-detail.component';
import { TransportRateComponent } from './transport/transport-rate/transport-rate.component';
import { DispatchHistoryComponent } from './transport/dispatch-history/dispatch-history.component';
import { DispatchOrderComponent } from './transport/dispatch-order/dispatch-order.component';
import { FindTransportComponent } from './transport/find-transport/find-transport.component';
import {ForgotPasswordComponent} from './login/forgot-password/forgot-password.component';
import { BargainRequestComponent } from './bargain-request/bargain-request.component';
import { BargainQuoteComponent } from './bargain-quote/bargain-quote.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent
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
    component: GBListingsComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'addProducts',
    component: AddProductsComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin']
    }
  },
  {
    path: 'listgbItem',
    component: ListGBItemComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin']
    }
  },
  {
    path: 'auction',
    component: AuctionComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: AuctionListComponent,
        data: {
          roles: ['admin', 'seller', 'buyer']
        }
      },
      {
        path: 'add',
        component: CreateAuctionComponent,
        data: {
         // roles: ['admin', 'seller', 'buyer']
        }
      },
      {
        path: 'edit/:id',
        component: CreateAuctionComponent,
        data: {
          roles: ['admin', 'seller', 'buyer']
        }
      },
      {
        path: 'status',
        component: AuctionStatusComponent,
        data: {
          roles: ['admin', 'seller']
        }
      },
      {
        path: 'bids',
        component: MyBidsComponent,
        data: {
          roles: ['buyer', 'seller']
        }
      },
      {
        path: 'active',
        component: AuctionListComponent,
        data: {
          roles: ['buyer', 'seller']
        }
      },
      {
        path: 'inactive',
        component: AuctionListComponent,
        data: {
          roles: ['buyer', 'seller']
        }
      },
      {
        path: ':id',
        component: AuctionDetailComponent
      }
    ],
    data: {
      roles: ['admin', 'buyer', 'seller']
    }
  },
  {
    path: 'transport',
    component: TransportComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'add',
        component: ListTransportRateComponent,
        data: {
         roles: ['admin', 'seller', 'buyer']
        }
      },
      {
        path: 'edit/:id',
        component: ListTransportRateComponent,
        data: {
          roles: ['admin', 'seller', 'buyer']
        }
      },
      {
        path: 'user',
        component: TransportRateComponent,
        data: {
          roles: ['admin', 'seller', 'buyer']
        }
      },
      {
        path: 'dispatch',
        component: DispatchDetailComponent,
        data : {
          roles: ['admin', 'seller', 'buyer']
        }
      },
      {
        path: 'dispatchhistory',
        component: DispatchHistoryComponent,
        data :{
          roles: ['admin', 'seller', 'buyer']
        }
      },
      {
        path: 'dispatchorder',
        component: DispatchOrderComponent,
        data: {
          roles: ['admin', 'seller', 'buyer']
        }
      },
      {
        path: 'findtransport',
        component: FindTransportComponent,
        data: {
          roles: ['admin', 'seller', 'buyer']
        }
      }
    ],
    data: {
      roles: ['admin', 'buyer', 'seller']
    }
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
    data: {roles: ['admin', 'buyer', 'seller']}
  },
  {
    path: 'gbproduct/:id',
    component: GBProductDetailComponent,
    canActivate: [AuthGuard],
    data: {roles: ['admin', 'buyer', 'seller']}
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
