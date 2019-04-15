import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidators} from '../login/login-form.validators';
import {CityService} from '../services/city.service';
import {StateService} from '../services/state.service';
import { forkJoin } from 'rxjs';
import {UserService} from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppError } from '../common/app-error';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form = new FormGroup({
    account: new FormGroup({
      'name' : new FormControl('', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]),
      'email' : new FormControl('', [Validators.email]),
      'phone' : new FormControl('', [Validators.required, Validators.minLength(10),
        Validators.maxLength(10), Validators.pattern('^[0-9]*$'),
        FormValidators.cannotContainSpace],
        FormValidators.shouldBeUnique),
      'password' : new FormControl('', [Validators.required, Validators.minLength(8)]),
      'pan' : new FormControl(),
      'GST' : new FormControl('', [Validators.required]),
      'address' : new FormControl('', [Validators.required]),
      'city' : new FormControl('', [Validators.required]),
      'state' : new FormControl('', [Validators.required]),
      'pin' : new FormControl('', [Validators.required])
    })
  });

  cities: any;
  states: any;
  loginData: any;
  constructor(private stateService: StateService, private cityService: CityService,
    private user: UserService, private router: Router) { }

  ngOnInit() {
    forkJoin([this.cityService.getAll(), this.stateService.getAll()])
    .subscribe(response => {
      this.cities = response[0];
      this.states = response[1];
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });
  }

  get phone () {
    return this.form.get('account.phone');
  }

  get name () {
    return this.form.get('account.name');
  }

  get email () {
    return this.form.get('account.email');
  }

  get password () {
    return this.form.get('account.password');
  }

  get GST () {
    return this.form.get('account.GST');
  }

  get address () {
    return this.form.get('account.state');
  }

  get city () {
    return this.form.get('account.city');
  }

  get state () {
    return this.form.get('account.state');
  }

  login() {
    const formData = {
      phone:  '+91' + this.form.value.account.phone,
      name:   this.form.value.account.name,
      email:  this.form.value.account.email,
      password:   this.form.value.account.password,
      pan:    this.form.value.account.pan,
      GST:    this.form.value.account.GST,
      address:    this.form.value.account.address,
      cityId:   this.form.value.account.city,
      stateId:  this.form.value.account.state,
      pin:    this.form.value.account.pin,
      isBuyer: 'true'
    };

    this.user.create(formData)
    .subscribe(response => {
      this.loginData = response;;
      alert('Registration successful, Please login');
      this.router.navigate(['/login']);
    }, (error: AppError) => {
      console.log(error);
      if (error.originalError.status === 400) {
        alert('Invalid id or password');
      } else {
        this.router.navigate(['/errorpage']);
      }
      console.log(error.originalError.status);
    });
    // if (!valid) {
    //   this.form.setErrors({
    //     invalidLogin: true; invalid login should be of validatin error type
    //                          used to display error on invalid login
    //   });
    // }
  }

}
