import { CreditRoutes } from './credit.routes';
import { CreditRequestComponent } from './credit-request/credit-request.component';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CreditRequestComponent],
  imports: [
    CommonModule,RouterModule,OwlDateTimeModule, OwlNativeDateTimeModule,FormsModule, 
    ReactiveFormsModule,NgbModule,CreditRoutes
  ]
})
export class CreditModule { }
