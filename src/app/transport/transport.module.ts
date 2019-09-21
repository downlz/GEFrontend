import { TransportRouteModule } from './transport.routes';
import { TransportSidebarComponent } from './sidebar/sidebar.component';
import { FindTransportComponent } from './find-transport/find-transport.component';
import { DispatchHistoryComponent } from './dispatch-history/dispatch-history.component';
import { DispatchOrderComponent } from './dispatch-order/dispatch-order.component';
import { DispatchDetailComponent } from './dispatch-detail/dispatch-detail.component';
import { TransportRateComponent } from './transport-rate/transport-rate.component';
import { ListTransportRateComponent } from './list-transport-rate/list-transport-rate.component';
import { TransportComponent } from './transport.component';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import { TransportComponent } from './transport.component';

@NgModule({
  declarations: [TransportComponent,DispatchDetailComponent,DispatchHistoryComponent,DispatchOrderComponent,FindTransportComponent,
    ListTransportRateComponent,TransportRateComponent,TransportSidebarComponent],
  imports: [
    CommonModule,RouterModule,OwlDateTimeModule, OwlNativeDateTimeModule,
    FormsModule, ReactiveFormsModule, NgbModule, TransportRouteModule
  ]
})
export class TransportModule { }