import { NgModule } from '@angular/core';
import { CommonModule,LocationStrategy, HashLocationStrategy } from '@angular/common';
// import {} from '@angular/common';
// import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TermsConditionRoute } from './terms-use.routes';
import { TermsUseComponent } from './terms-use.component';

@NgModule({
  declarations: [TermsUseComponent],
  imports: [
    CommonModule,TermsConditionRoute
  ],
  // providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class TermsConditionModule { }
