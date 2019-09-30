
import { AuthGuard } from './../_guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GBOrderCardComponent } from './gborder-card/gborder-card.component';
import { GBProductDetailComponent } from './gbproduct-detail/gbproduct-detail.component';
import { GBOrderNowComponent } from './gborder-now/gborder-now.component';
import { ListGBItemComponent } from './listgb-item/listgb-item.component';
import { GroupBuyingComponent } from './group-buying/group-buying.component';
import { GBListingCardComponent } from './gblisting-card/gblisting-card.component';
import { GBListingsComponent } from './gblistings/gblistings.component';

const routes: Routes = [
  {
    path: '',
    component: GBListingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'gborderNow/:id',
    component: GBOrderNowComponent,
    data: {
      roles: ['admin', 'buyer']
    }
  },
  {
    path: 'gbproduct/:id',
    component: GBProductDetailComponent,
    data: { roles: ['admin', 'buyer', 'seller'] }
  },
  {
    path: 'groupbuying',
    component: GroupBuyingComponent,
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
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GroupBuyRoutes { }