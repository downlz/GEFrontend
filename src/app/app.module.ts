// import { TransportModule } from './transport/transport.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ErrorHandler} from '@angular/core';
// import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
// import {MatTooltipModule} from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {DatePickerModule} from '@syncfusion/ej2-angular-calendars';
import {FileUploadModule} from 'ng2-file-upload';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import { FilterlistPipe } from './filterlist.pipe';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {BasicComponent} from './basic/basic.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {ListingsComponent} from './listings/listings.component';

import {FragmentPolyfillModule} from './fragment-polyfill.module';
import {AppErrorHandler} from './common/app-error-handler';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';


import {ListingService} from './services/listing.service';
import {DataService} from './services/data.service';
import {CityService} from './services/city.service';
import {StateService} from './services/state.service';
import {UserService} from './services/user.service';
import {BargainService} from './services/bargain.service';
import {ReferralService} from './services/referral.service';
import {UsersellerService} from './services/seller.service';
import {AuthService} from './services/auth.service';
import {PriceService} from './services/price.service';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import {ListingCardComponent} from './listing-card/listing-card.component';
import {RegistrationComponent} from './users/registration/registration.component';
import {ReferUserComponent} from './users/refer-user/refer-user.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorPageComponent} from './error-page/error-page.component';
// import {TermsUseComponent} from './terms-use/terms-use.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductListComponent} from './add-products/product-list/product-list.component';
import {ProductDataComponent} from './add-products/products-data.component';
import {ProductTabComponent} from './add-products/product-tabs/product-tabs.component';
import {OrderNowComponent} from './order-now/order-now.component';
import {BargainOrderComponent} from './bargain-order/bargain-order.component';
import {BargainQuoteComponent} from './bargain-quote/bargain-quote.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {AllOrdersComponent} from './all-orders/all-orders.component';
import {BargainRequestComponent} from './bargain-request/bargain-request.component';

import {AddProductsComponent} from './add-products/add-products.component';
import {AddItemnameComponent} from './add-products/add-itemname/add-itemname.component';
import { AddCategoryComponent} from './add-products/add-category/add-category.component';
import {ProductSidebarComponent} from './add-products/sidebar/sidebar.component';
import { ProductBargainSpecifierComponnent } from './add-products/product-bargain-list/product-bargain-list.component';

import {OrderCardComponent} from './order-card/order-card.component';
// import {GBOrderCardComponent} from './gborder-card/gborder-card.component';
// import {GBProductDetailComponent} from './gbproduct-detail/gbproduct-detail.component';
// import {GBOrderNowComponent} from './gborder-now/gborder-now.component';
// import {ListGBItemComponent} from './listgb-item/listgb-item.component';
// import {GroupBuyingComponent} from './group-buying/group-buying.component';
// import {GBListingCardComponent} from './gblisting-card/gblisting-card.component';
// import {GBListingsComponent} from './gblistings/gblistings.component';

// import {AuctionComponent} from './auction/auction.component';
// import {SidebarComponent} from './auction/sidebar/sidebar.component';
// import {CreateAuctionComponent} from './auction/create-auction/create-auction.component';
// import {AuctionListComponent} from './auction/auction-list/auction-list.component';
// import {AuctionStatusComponent} from './auction/auction-status/auction-status.component';
// import {AuctionListingCardComponent} from './auction/auction-listing-card/auction-listing-card.component';
// import {AuctionTableComponent} from './auction/auction-table/auction-table.component';
// import {AuctionDetailComponent} from './auction/auction-detail/auction-detail.component';
// import {ListingDetailComponent} from './auction/auction-detail/listing-detail/listing-detail.component';
// import {BidsTableComponent} from './auction/bids-table/bids-table.component';
// import {PlaceBidComponent} from './auction/place-bid/place-bid.component';
// import {MyBidsComponent} from './auction/my-bids/my-bids.component';

// import { BidHistoryComponent } from './auction/bid-history/bid-history.component';

// import { TransportComponent } from './transport/transport.component';
// import { FindTransportComponent } from './transport/find-transport/find-transport.component';
// import { TransportSidebarComponent } from './transport/sidebar/sidebar.component';
// import { ListTransportRateComponent } from './transport/list-transport-rate/list-transport-rate.component';
// import { TransportRateComponent } from './transport/transport-rate/transport-rate.component';
// import { DispatchDetailComponent } from './transport/dispatch-detail/dispatch-detail.component';
// import { DispatchHistoryComponent } from './transport/dispatch-history/dispatch-history.component';
// import { DispatchOrderComponent } from './transport/dispatch-order/dispatch-order.component';

// import {ForgotPasswordComponent} from './login/forgot-password/forgot-password.component';

import { CreateOrderComponent } from './agent-mgmt/create-order/create-order.component';
// import { AddUsersComponent } from './add-products/add-users/add-users.component';

import { AppFooterComponent } from './app-footer/app-footer.component';
// import { ForgotPasswordModule } from './login/forgot-password/forgot-password.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    // NavBarNotificationComponent,
    // FilterlistPipe,
    // FileSelectDirective,
    BasicComponent,
    LandingPageComponent,
    ListingsComponent,
    ListingCardComponent,
    // GBListingCardComponent,
    // GBListingsComponent,
    RegistrationComponent,
    ReferUserComponent,
    LoginComponent,
    // ForgotPasswordComponent,
    ErrorPageComponent,
    // TermsUseComponent,
    ProductSidebarComponent,
    ProductDataComponent,
    ProductDetailComponent,
    // GBProductDetailComponent,
    OrderNowComponent,
    BargainOrderComponent,
    BargainQuoteComponent,
    // GBOrderNowComponent,
    MyOrdersComponent,
    AllOrdersComponent,
    BargainRequestComponent,
    // GroupBuyingComponent,
    AddProductsComponent,
    ProductBargainSpecifierComponnent,
    // AddItemnameComponent,
    // ListGBItemComponent,
    OrderCardComponent,
    // GBOrderCardComponent,
    // AuctionComponent,
    // SidebarComponent,
    // CreateAuctionComponent,
    // AuctionListComponent,
    // AuctionStatusComponent,
    // AuctionListingCardComponent,
    // AuctionTableComponent,
    // AuctionDetailComponent,
    // ListingDetailComponent,
    // BidsTableComponent,
    // PlaceBidComponent,
    // MyBidsComponent,
    // BidHistoryComponent,

    // TransportComponent,
    // TransportSidebarComponent,
    // ListTransportRateComponent,
    // TransportRateComponent,
    // DispatchDetailComponent,
    // DispatchHistoryComponent,
    // DispatchOrderComponent,
    // FindTransportComponent,
    CreateOrderComponent,
    ProductTabComponent,
    ProductListComponent,
    // AddUsersComponent,
    AppFooterComponent,
    AddItemnameComponent,
    AddCategoryComponent
  ],
  // entryComponents: [PlaceBidComponent],
  imports: [
    BrowserModule,
    // MDBBootstrapModule.forRoot(),
    // Ng2SearchPipeModule,
    NgbModule,
    DatePickerModule,
    FileUploadModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot(),
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
    BargainService,
    ReferralService,
    // UserbuyerService,
    UsersellerService,
    AuthService,
    PriceService,
    {provide: ErrorHandler, useClass: AppErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
