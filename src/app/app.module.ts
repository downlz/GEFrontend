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
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {BasicComponent} from './basic/basic.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LandingPageComponent} from './landing-page/landing-page.component';

import {FragmentPolyfillModule} from './fragment-polyfill.module';
import {AppErrorHandler} from './common/app-error-handler';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';


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
// import {ListingsComponent} from './products/listings/listings.component';
// import {ListingCardComponent} from './products/listing-card/listing-card.component';
// import {ProductDetailComponent} from './product-detail/product-detail.component';
import {RegistrationComponent} from './users/registration/registration.component';
import {ReferUserComponent} from './users/refer-user/refer-user.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorPageComponent} from './error-page/error-page.component';

import {OrderNowComponent} from './order-now/order-now.component';
import {BargainOrderComponent} from './bargain-order/bargain-order.component';
import {BargainQuoteComponent} from './bargain-quote/bargain-quote.component';
// import {MyOrdersComponent} from './my-orders/my-orders.component';
// import {AllOrdersComponent} from './all-orders/all-orders.component';
// import {OrderCardComponent} from './order-card/order-card.component';
import {BargainRequestComponent} from './bargain-request/bargain-request.component';
import { CreateOrderComponent } from './agent-mgmt/create-order/create-order.component';

import { AppFooterComponent } from './app-footer/app-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    BasicComponent,
    LandingPageComponent,
    // ListingsComponent,
    // ListingCardComponent,
    // ProductDetailComponent,
    RegistrationComponent,
    ReferUserComponent,
    LoginComponent,
    ErrorPageComponent,
    OrderNowComponent,
    BargainOrderComponent,
    BargainQuoteComponent,
    // MyOrdersComponent,
    // AllOrdersComponent,
    // OrderCardComponent,
    BargainRequestComponent,
    CreateOrderComponent,
    AppFooterComponent
  ],
  // entryComponents: [PlaceBidComponent],
  imports: [
    BrowserModule,
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
    NgxPaginationModule,
    FragmentPolyfillModule.forRoot({
      smooth: true
    })
  ],
  providers: [
    ListingService,
    StateService,
    CityService,
    UserService,
    BargainService,
    ReferralService,
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
