import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {ListingsComponent} from './listings/listings.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {LoginComponent} from './login/login.component';
import {OrderNowComponent} from './order-now/order-now.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {AllOrdersComponent} from './all-orders/all-orders.component';
import {GroupBuyingComponent} from './group-buying/group-buying.component';
import {AddProductsComponent} from './add-products/add-products.component';
import {ListGBItemComponent} from './listgb-item/listgb-item.component';
import {RegistrationComponent} from './registration/registration.component';
import {AuctionComponent} from './auction/auction.component';
import {CreateAuctionComponent} from './auction/create-auction/create-auction.component';
import {AuctionListComponent} from './auction/auction-list/auction-list.component';
import {AuctionStatusComponent} from './auction/auction-status/auction-status.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {AuthGuard} from './_guards/auth.guard';
import {GBListingsComponent} from './gblistings/gblistings.component';
import {BidsComponent} from './auction/bids/bids.component';

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
    path: 'auction',
    component: AuctionComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: AuctionListComponent,
        data: {
          roles: ['admin', 'seller']
        }
      },
      {
        path: 'add',
        component: CreateAuctionComponent,
        data: {
          roles: ['admin']
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
        component: BidsComponent,
        data: {
          roles: ['buyer']
        }
      },
      {
        path: 'active',
        component: AuctionListComponent,
        data: {
          roles: ['buyer']
        }
      },
      {
        path: 'inactive',
        component: AuctionListComponent,
        data: {
          roles: ['buyer']
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
    data: {roles: ['admin', 'buyer']}
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
