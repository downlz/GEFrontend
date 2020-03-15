import { AddProductsListRouteModule } from './products-list.routes';
import { ListingsComponent } from './listings/listings.component';
import { ListingCardComponent} from './listing-card/listing-card.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [ListingsComponent,ListingCardComponent,ProductDetailComponent],
  imports: [
    CommonModule,RouterModule,NgbModule,FormsModule,ReactiveFormsModule,AddProductsListRouteModule
  ],
  providers: [DatePipe]
})
export class AppProductsListModule { }