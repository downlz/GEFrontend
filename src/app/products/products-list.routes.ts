import { AuthGuard } from './../_guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingsComponent} from './listings/listings.component';
import { ListingCardComponent} from './listing-card/listing-card.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ListingsComponent
  },
  {
    // path: 'product/:id',
    path: ':id',
    component: ProductDetailComponent,
    canActivate: [AuthGuard],
    data: {roles: ['admin', 'buyer', 'seller','agent']}
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AddProductsListRouteModule { }