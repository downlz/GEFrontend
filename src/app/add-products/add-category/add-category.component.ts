import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
// import { FormValidators} from '../login/login-form.validators';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { AppError } from '../../common/app-error';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

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
  categoryEdit: any;
  formControls: any;
  userid: string;
  // transportEdit: any;

  constructor(private auth: AuthService,
    private categoryService: CategoryService,private userService: UserService,
    private router: Router,private route: ActivatedRoute) { 
this.allFormControls = {

      name: new FormControl('', [
      Validators.required,
      ]),
      tax: new FormControl('', [
      Validators.required,
      ]),
      hsn: new FormControl('', [
      Validators.required,
      ]),
      insurance: new FormControl(0, [
      Validators.required,
      ])

      };
      this.route.paramMap
      .subscribe(async params => {
      const id = params.get('id');
      if (id) {
      this.id = id;
      this.edit = true;
      await this.getCategoryName(id);
      } else {
      this.edit = false;
      }
      this.initializeForm();
      });

      this.userService.get('me')
        .subscribe(response => {
        const res = response as any;
        // this.user = res;
        this.userid = res._id;
        }, (error: Response) => {
        this.router.navigate(['/errorpage']);
        if (error.status === 400) {
        alert(' expected error, post already deleted');
        }
        console.log(error);
        });

}

  ngOnInit() {

 }

  get name () {
    return this.form.get('newcategory.name');
  }

  initializeForm() {
    let controls: any;
    if (!this.edit) {
      controls = [
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
      newcategory: new FormGroup(formControls)
    });
  }

  getCategoryName(id) {
    this.categoryService.get(id).subscribe((category) => {
      this.categoryEdit = category;
      this.form.controls.newcategory['controls'].duration.setValue(category['name']);
      this.form.controls.newcategory['controls'].pricequote.setValue(category['insurance']);
      this.form.controls.newcategory['controls'].vehicledtl.setValue(category['hsn']);
      this.form.controls.newcategory['controls'].vehicledtl.setValue(category['tax']);
    }, error => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      // this.loading = false;
      console.log(error);
    });
  }

  additemname() {
    const formData = {
      name:   this.form.value.newcategory.name,
      tax:  this.form.value.newcategory.tax,
      insurance:   this.form.value.newcategory.insurance,
      hsn:   this.form.value.newcategory.hsn
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
  save(event) {
  
  }
 }
