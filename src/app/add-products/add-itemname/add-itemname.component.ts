import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
// import { FormValidators} from '../login/login-form.validators';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {ItemnameService} from '../../services/itemname.service';
import { AppError } from '../../common/app-error';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-itemname',
  templateUrl: './add-itemname.component.html',
  styleUrls: ['./add-itemname.component.scss']
})
export class AddItemnameComponent implements OnInit {

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
  itemnameEdit: any;
  formControls: any;
  userid: string;
  // transportEdit: any;

  constructor(private auth: AuthService,
    private itemnameService: ItemnameService,private userService: UserService,
    private router: Router,private route: ActivatedRoute) { 
this.allFormControls = {

      name: new FormControl('', [
      Validators.required,
      ]),
      tax: new FormControl(0, [
      Validators.required,
      ]),
      hsn: new FormControl('', [
      Validators.required,
      ]),
      insurance: new FormControl(0,[
        Validators.required,
      ])
      };
      this.route.paramMap
      .subscribe(async params => {
      const id = params.get('id');
      if (id) {
      this.id = id;
      this.edit = true;
      await this.getItemName(id);
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

  initializeForm() {
    let controls: any;
    if (!this.edit) {
      controls = [
        'name',
        'tax',
        'hsn',
        'insurance'
      ];
  } else {
      controls = [
        'name',
        'tax',
        'hsn',
        'insurance',
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
      newItemName: new FormGroup(formControls)
    });
  }

  getItemName(id) {
    this.itemnameService.get(id).subscribe((itemname) => {
      this.itemnameEdit = itemname;
      this.form.controls.newItemName['controls'].duration.setValue(itemname['name']);
      this.form.controls.newItemName['controls'].pricequote.setValue(itemname['insurance']);
      this.form.controls.newItemName['controls'].vehicledtl.setValue(itemname['hsn']);
      this.form.controls.newItemName['controls'].vehicledtl.setValue(itemname['tax']);
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
      const itemname = this.form.getRawValue().newItemName;
      // console.log(transportrate);
      if (this.edit) {
        itemname._id = this.id;
        this.itemnameService.update(itemname).subscribe((response) => {
          // this.loading = false;
          alert('Itemname details updated successfully');
          this.router.navigate(['/product/additem']);

        }, err => {
          // this.loading = false;
          alert('There was a server error while updating this transport rate');
        });
      } else {
        itemname.tax = parseInt(itemname.tax);
        this.itemnameService.create(itemname).subscribe((response) => {
          // this.loading = false;
          alert('Itemname added successfully');
          this.router.navigate(['/product/additem']);

        }, err => {
          console.log(err);
          // this.loading = false;
          alert('There was a server error while listing this transport rate');
        });

      }
    }
  }
  additemname() {
    const formData = {
      name:   this.form.value.newitemname.name,
      tax:  this.form.value.newitemname.tax,
      insurance:   this.form.value.newitemname.insurance,
      hsn:   this.form.value.newitemname.hsn
    };

    // this.testitem.create(formData)
    // .subscribe(response => {
    //   this.itemnameData = response;;
    //   alert('Registration successful, Please login');
    //   // this.router.navigate(['/login']);
    // }, (error: AppError) => {
    //   console.log(error);
    //   if (error.originalError.status === 400) {
    //     alert('Invalid id or password');
    //   } else {
    //     this.router.navigate(['/errorpage']);
    //   }
    //   console.log(error.originalError.status);
    // });
  }
 }
