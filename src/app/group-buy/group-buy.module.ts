import { GroupBuyRoutes } from './group-buy.routes';
import {GBOrderCardComponent} from './gborder-card/gborder-card.component';
import {GBProductDetailComponent} from './gbproduct-detail/gbproduct-detail.component';
import {GBOrderNowComponent} from './gborder-now/gborder-now.component';
import {ListGBItemComponent} from './listgb-item/listgb-item.component';
import {GroupBuyingComponent} from './group-buying/group-buying.component';
import {GBListingCardComponent} from './gblisting-card/gblisting-card.component';
import {GBListingsComponent} from './gblistings/gblistings.component';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [GBOrderCardComponent,GBProductDetailComponent,GBOrderNowComponent,ListGBItemComponent,
    GroupBuyingComponent,GBListingCardComponent,GBListingsComponent],
  imports: [
    CommonModule,RouterModule,OwlDateTimeModule, OwlNativeDateTimeModule,FormsModule, 
    ReactiveFormsModule,NgbModule,GroupBuyRoutes
  ]
})
export class GroupBuyModule { }
