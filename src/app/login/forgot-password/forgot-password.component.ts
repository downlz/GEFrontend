import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppError } from '../../common/app-error';
import { FormValidators } from '../../_helpers/login-form.validators';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  isMatched: Boolean = false;
  passwordData: any;
  form = new FormGroup({
    passwordreset: new FormGroup({
      'phone' : new FormControl('', [Validators.required, Validators.minLength(10),
        Validators.maxLength(10), Validators.pattern('^[0-9]*$'),
        FormValidators.cannotContainSpace]),
      'pan' : new FormControl('', [Validators.required]),
      'gstin' : new FormControl('', [Validators.required]),
      'password' : new FormControl('', [Validators.required, Validators.minLength(8)]),
      'confirmPassword' : new FormControl('', [Validators.required])
    })
  });

  constructor(private auth: AuthService,private user: UserService, private router: Router) { }

  ngOnInit() {
  }

  get phone() {
    return this.form.get('passwordreset.phone');
  }
  get pan() {
    return this.form.get('passwordreset.pan');
  }
  get gstin() {
    return this.form.get('passwordreset.gstin');
  }
  get password() {
    return this.form.get('passwordreset.password');
  }
  get confirmPassword() {
    return this.form.get('passwordreset.confirmPassword');
  }
  // // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onPasswordChange() {
    if (this.form.value.passwordreset.password !== this.form.value.passwordreset.confirmPassword) {
      this.isMatched = false;
    } else {
      this.isMatched = true;
  }
};

resetPassword() {
    
    this.user.initiatePassRqst(this.form.value.passwordreset.phone, 
                              this.form.value.passwordreset.pan.toUpperCase(),
                              this.form.value.passwordreset.gstin.toUpperCase(),
                              this.form.value.passwordreset.password)
    .subscribe(response => {
      this.passwordData = response;
      alert('Password reset was successful');
      this.router.navigate(['/login']);
    }, (error: Response) => {
      if (error.status === 400) {
        this.router.navigate(['/errorpage']);
      } else {
        alert('User information is incorrect to complete this request');
      }
      console.log(error);
    });

  }
}
