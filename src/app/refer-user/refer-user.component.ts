import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidators} from '../login/login-form.validators';
import {CityService} from '../services/city.service';
import {StateService} from '../services/state.service';
import { forkJoin } from 'rxjs';
import {UserService} from '../services/user.service';
// import {GBListing} from '../services/gblisting.service';
import {ReferralService} from '../services/referral.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppError } from '../common/app-error';

@Component({
  selector: 'app-refer-user',
  templateUrl: './refer-user.component.html',
  styleUrls: ['./refer-user.component.scss']
})
export class ReferUserComponent implements OnInit {

  form = new FormGroup({
    referral: new FormGroup({
      'name' : new FormControl('', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]),
      'email' : new FormControl('', [Validators.email]),
      'phone' : new FormControl('', [Validators.required, Validators.minLength(6),
        Validators.maxLength(20), Validators.pattern('^[0-9]*$'),
        FormValidators.cannotContainSpace],
        FormValidators.shouldBeUnique)
    })
  });
  
  cities: any;
  states: any;
  userid: any;
  referralData: any;
  constructor(private stateService: StateService, private cityService: CityService,
    private userService: UserService,private route: ActivatedRoute, private referral: ReferralService,  private router: Router) { }

  ngOnInit() {
    
    this.userService.get('me')
    .subscribe(response => {
      const res = response as any;
      // this.address = res.Addresses[0];
      this.userid = res._id;
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });

  }

  get phone () {
    return this.form.get('referral.phone');
  }

  get name () {
    return this.form.get('referral.name');
  }

  get email () {
    return this.form.get('referral.email');
  }

  referNow() {
    const formData = {
      phone:  '+91' + this.form.value.referral.phone,
      name:   this.form.value.referral.name,
      email:  this.form.value.referral.email,
      referredby: this.userid
    };
    // console.log(formData);
    this.referral.create(formData)
    .subscribe(response => {
      this.referralData = response;;
      alert('Invite made successfully from your profile');
      this.router.navigate(['/referral']);
    }, (error: AppError) => {
      console.log(error);
      if (error.originalError.status === 400) {
        alert('Invalid id or password');
      } else {
        this.router.navigate(['/errorpage']);
      }
      console.log(error.originalError.status);
    });
  }
}
