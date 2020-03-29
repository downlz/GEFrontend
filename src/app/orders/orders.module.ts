import { OrdersRoutes } from './orders.routes';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {AllOrdersComponent} from './all-orders/all-orders.component';
import {OrderCardComponent} from './order-card/order-card.component';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [MyOrdersComponent,AllOrdersComponent,OrderCardComponent],
  imports: [
    CommonModule,RouterModule,OwlDateTimeModule, OwlNativeDateTimeModule,FormsModule, 
    ReactiveFormsModule,NgbModule,OrdersRoutes,NgxPaginationModule
  ]
})
export class OrdersModule { }
