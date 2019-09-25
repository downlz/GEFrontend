import {AuctionComponent} from './auction.component';
import {CreateAuctionComponent} from './create-auction/create-auction.component';
import {AuctionListComponent} from './auction-list/auction-list.component';
import {AuctionStatusComponent} from './auction-status/auction-status.component';
import {AuctionDetailComponent} from './auction-detail/auction-detail.component';
import {MyBidsComponent} from './/my-bids/my-bids.component';
import { AuthGuard } from './../_guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
      path: '',
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
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuctionRouteModule { }