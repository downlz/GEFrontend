import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
// import { FormValidators} from '../login/login-form.validators';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {CityService} from '../../services/city.service';
import {StateService} from '../../services/state.service';
import { AppError } from '../../common/app-error';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss']
})
export class AddCityComponent implements OnInit {

  form: FormGroup;
  seller: any;
  itemnames: any;
  categories: any;
  units: any;
  cities: any;
  states: any;
  edit: boolean;
  submitted: boolean;
  id: string;
  allFormControls: any;
  cityEdit: any = '';
  formControls: any;
  userid: string;
  // transportEdit: any;

  constructor(private auth: AuthService,
    private cityService: CityService,private stateService: StateService,private userService: UserService,
    private router: Router,private route: ActivatedRoute) { 
this.allFormControls = {

      name: new FormControl('', [
      Validators.required,
      ]),
      stateId: new FormControl('', [
      Validators.required,
      ]),
      lat: new FormControl(0, []),
      lng: new FormControl(0, [])
      };
      this.route.paramMap
      .subscribe(async params => {
      const id = params.get('id');
      if (id) {
      this.id = id;
      this.edit = true;
      await this.getCity(id);
      } else {
      this.edit = false;
      }
      this.initializeForm();
      });

      // this.userService.get('me')
      //   .subscribe(response => {
      //   const res = response as any;
      //   // this.user = res;
      //   this.userid = res._id;
      //   }, (error: Response) => {
      //   this.router.navigate(['/errorpage']);
      //   if (error.status === 400) {
      //   alert(' expected error, post already deleted');
      //   }
      //   console.log(error);
      //   });

}

  ngOnInit() {
    forkJoin([this.stateService.getAll()])
    .subscribe(response => {
      // this.cities = response[0];
      this.states = response[0];
      // console.log(this.states);
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });
 }

  // get name () {
  //   return this.form.get('newcity.name');
  // }

  // get state () {
  //   return this.form.get('newcity.state');
  // }

  initializeForm() {
    let controls: any;
    if (!this.edit) {
      controls = [
        'name',
        'lat',
        'lng',
        'stateId'
      ];
  } else {
      controls = [
        'name',
        'lat',
        'lng',
        'stateId'
      ];
  }
    const formControls = {};
    controls.map(control => {
      if (control) {
        formControls[control] = this.allFormControls[control];
      }
    });
    this.formControls = formControls;
    this.form = new FormGroup({
      newcity: new FormGroup(formControls)
    });
  }

  getCity(id) {
    this.cityService.get(id).subscribe((city) => {
      this.cityEdit = city;
      this.form.controls.newcity['controls'].name.setValue(city['name']);
      this.form.controls.newcity['controls'].lat.setValue(this.cityEdit.location.coordinates[0]);
      this.form.controls.newcity['controls'].lng.setValue(this.cityEdit.location.coordinates[1]);
      // this.form.controls.newcity['controls'].vehicledtl.setValue(city['tax']);
    }, error => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      // this.loading = false;
      console.log(error);
    });
  }
  save(event) {
    this.submitted = true;
    event.preventDefault();
    if (this.form.valid) {
      const city = this.form.getRawValue().newcity;
      if (this.edit) {
        city._id = this.id;
        city.type = "Point";
        this.cityService.update(city).subscribe((response) => {
          // this.loading = false;
          alert('City details updated successfully');
          this.router.navigate(['/product/allcity']);

        }, err => {
          // this.loading = false;
          alert('There was a server error while updating this city');
        });
      } else {
        
        city.type = "Point";
        this.cityService.create(city).subscribe((response) => {
          // this.loading = false;
          alert('City added successfully');
          this.router.navigate(['/product/allcity']);

        }, err => {
          console.log(err);
          // this.loading = false;
          alert('There was a server error while listing this city');
        });

      }
    }
  }
  addcity() {
    const formData = {
      name:   this.form.value.newcity.name,
      tax:  this.form.value.newcity.tax,
      insurance:   this.form.value.newcity.insurance,
      hsn:   this.form.value.newcity.hsn
    };
  }
 }
