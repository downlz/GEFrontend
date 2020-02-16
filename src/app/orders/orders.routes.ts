
import { AuthGuard } from '../_guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {AllOrdersComponent} from './all-orders/all-orders.component';
import {OrderCardComponent} from './order-card/order-card.component';

const routes: Routes = [
  {
    path: '',
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
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OrdersRoutes { }