import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
// import { FormValidators} from '../login/login-form.validators';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
// import {ItemnameService} from '../../services/itemname.service';
import {ManufacturerService} from '../../services/manufacturer.service';
import { AppError } from '../../common/app-error';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-manufacturer',
  templateUrl: './add-manufacturer.component.html',
  styleUrls: ['./add-manufacturer.component.scss']
})
export class AddManufacturerComponent implements OnInit {

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
  mnfnameEdit: any;
  formControls: any;
  userid: string;
  // transportEdit: any;

  constructor(private auth: AuthService,
    private manufacturerService: ManufacturerService,private userService: UserService,
    private router: Router,private route: ActivatedRoute) { 
this.allFormControls = {

      name: new FormControl('', [
      Validators.required,
      ])

      };
      this.route.paramMap
      .subscribe(async params => {
      const id = params.get('id');
      if (id) {
      this.id = id;
      this.edit = true;
      await this.getMnfName(id);
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

 }

  get name () {
    return this.form.get('newmnf.name');
  }

  initializeForm() {
    let controls: any;
    if (!this.edit) {
      controls = [
        'name'
      ];
  } else {
      controls = [
        'name'
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
      newmnf: new FormGroup(formControls)
    });
  }

  getMnfName(id) {
    this.manufacturerService.get(id).subscribe((mnfname) => {
      this.mnfnameEdit = mnfname;
      this.form.controls.newmnf['controls'].duration.setValue(mnfname['name']);
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
      const manufacturer = this.form.getRawValue().newmnf;
      // console.log(transportrate);
      if (this.edit) {
        manufacturer._id = this.id;
        this.manufacturerService.update(manufacturer).subscribe((response) => {
          // this.loading = false;
          alert('Manufacturer details updated successfully');
          this.router.navigate(['/product/addmnf']);

        }, err => {
          // this.loading = false;
          alert('There was a server error while updating this manufacturer');
        });
      } else {
        this.manufacturerService.create(manufacturer).subscribe((response) => {
          // this.loading = false;
          alert('Manufacturer added successfully');
          this.router.navigate(['/product/addmnf']);

        }, err => {
          console.log(err);
          // this.loading = false;
          alert('There was a server error while listing this manufacturer');
        });

      }
    }
  }
  
  addmnfname() {
    const formData = {
      name:   this.form.value.newmnf.name
    };

  }
 }
