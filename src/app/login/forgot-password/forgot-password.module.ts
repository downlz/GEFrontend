import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ForgotPasswordRouteModule } from './forgot-password.routes';
import { ForgotPasswordComponent } from './forgot-password.component';

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,ForgotPasswordRouteModule,FormsModule,ReactiveFormsModule
  ]
})
export class ForgotPasswordModule { }
