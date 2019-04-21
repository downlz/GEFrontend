import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { FileSelectDirective } from 'ng2-file-upload';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BasicComponent } from './basic/basic.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ListingsComponent } from './listings/listings.component';
import { GBListingsComponent } from './gblistings/gblistings.component';
import { FragmentPolyfillModule } from './fragment-polyfill.module';
import { AppErrorHandler } from './common/app-error-handler';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { ListingService } from './services/listing.service';
import { DataService } from './services/data.service';
import { CityService } from './services/city.service';
import { StateService } from './services/state.service';
import { UserService} from './services/user.service';
import { ReferralService} from './services/referral.service';
import { UsersellerService} from './services/seller.service';
import { AuthService } from './services/auth.service';
import { PriceService } from './services/price.service';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { ListingCardComponent } from './listing-card/listing-card.component';
import { GBListingCardComponent } from './gblisting-card/gblisting-card.component';
import { RegistrationComponent } from './registration/registration.component';
import { ReferUserComponent } from './refer-user/refer-user.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { OrderNowComponent } from './order-now/order-now.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { GroupBuyingComponent } from './group-buying/group-buying.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { ListGBItemComponent } from './listgb-item/listgb-item.component';
import { OrderCardComponent } from './order-card/order-card.component';
import { GBProductDetailComponent } from './gbproduct-detail/gbproduct-detail.component';
import { GBOrderNowComponent } from './gborder-now/gborder-now.component';
import { AuctionComponent } from './auction/auction.component';
import { SidebarComponent } from './auction/sidebar/sidebar.component';
import { CreateAuctionComponent } from './auction/create-auction/create-auction.component';
import { AuctionListComponent } from './auction/auction-list/auction-list.component';
import { AuctionStatusComponent } from './auction/auction-status/auction-status.component';
import { AuctionListingCardComponent } from './auction/auction-listing-card/auction-listing-card.component';
import { BidsComponent } from './auction/bids/bids.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FileSelectDirective,
    BasicComponent,
    LandingPageComponent,
    ListingsComponent,
    ListingCardComponent,
    GBListingCardComponent,
    GBListingsComponent,
    RegistrationComponent,
    ReferUserComponent,
    LoginComponent,
    ErrorPageComponent,
    ProductDetailComponent,
    GBProductDetailComponent,
    OrderNowComponent,
    GBOrderNowComponent,
    MyOrdersComponent,
    AllOrdersComponent,
    GroupBuyingComponent,
    AddProductsComponent,
    // AddItemnameComponent,
    ListGBItemComponent,
    OrderCardComponent,
    AuctionComponent,
    SidebarComponent,
    CreateAuctionComponent,
    AuctionListComponent,
    AuctionStatusComponent,
    AuctionListingCardComponent,
    BidsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    DatePickerModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FragmentPolyfillModule.forRoot({
      smooth: true
    })
  ],
  providers: [
    ListingService,
    // DataService,
    StateService,
    CityService,
    UserService,
    ReferralService,
    // UserbuyerService,
    UsersellerService,
    AuthService,
    PriceService,
    {provide: ErrorHandler, useClass: AppErrorHandler},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
