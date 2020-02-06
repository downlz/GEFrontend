
import { AuthGuard } from './../_guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreditRequestComponent } from './credit-request/credit-request.component';

const routes: Routes = [
  {
    path: 'creditrequest',
    component: CreditRequestComponent,
    // canActivate: [AuthGuard],
    data: {roles: ['admin', 'buyer', 'seller','agent']}
  },
  // {
  //   path: 'gborderNow/:id',
  //   component: GBOrderNowComponent,
  //   data: {
  //     roles: ['admin', 'buyer']
  //   }
  // },
  // {
  //   path: 'gbproduct/:id',
  //   component: GBProductDetailComponent,
  //   data: { roles: ['admin', 'buyer', 'seller'] }
  // },
  // {
  //   path: 'groupbuying',
  //   component: GroupBuyingComponent,
  //   data: {
  //     roles: ['admin']
  //   }
  // },
  // {
  //   path: 'listgbItem',
  //   component: ListGBItemComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     roles: ['admin']
  //   }
  // }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CreditRoutes { }