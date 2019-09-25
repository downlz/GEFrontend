import { AuctionRouteModule } from './auction.routes';
import {AuctionComponent} from './auction.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {CreateAuctionComponent} from './create-auction/create-auction.component';
import {AuctionListComponent} from './auction-list/auction-list.component';
import {AuctionStatusComponent} from './auction-status/auction-status.component';
import {AuctionListingCardComponent} from './auction-listing-card/auction-listing-card.component';
import {AuctionTableComponent} from './auction-table/auction-table.component';
import {AuctionDetailComponent} from './auction-detail/auction-detail.component';
import {ListingDetailComponent} from './auction-detail/listing-detail/listing-detail.component';
import {BidsTableComponent} from './bids-table/bids-table.component';
import {PlaceBidComponent} from './place-bid/place-bid.component';
import {MyBidsComponent} from './my-bids/my-bids.component';
import { BidHistoryComponent } from './bid-history/bid-history.component';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import { TransportComponent } from './transport.component';

@NgModule({
  declarations: [AuctionComponent,CreateAuctionComponent,AuctionListComponent,AuctionStatusComponent,AuctionDetailComponent,
    MyBidsComponent,SidebarComponent,AuctionListingCardComponent,AuctionTableComponent,ListingDetailComponent,
    BidsTableComponent,PlaceBidComponent,BidHistoryComponent
  ],
  entryComponents: [PlaceBidComponent],
  imports: [
    CommonModule,RouterModule,OwlDateTimeModule, OwlNativeDateTimeModule,
    FormsModule, ReactiveFormsModule, NgbModule, AuctionRouteModule
  ]
})
export class AuctionModule { }