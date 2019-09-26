import { VerifyUserComponent } from './verify-user/verify-user.component';
import { UserMgmtRoute } from './user-mgmt.routes';
import { UserMgmtComponent } from './user-mgmt.component';
import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [UserMgmtComponent,VerifyUserComponent],
  entryComponents: [VerifyUserComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,UserMgmtRoute
  ]
})
export class UserMgmtModule { }
