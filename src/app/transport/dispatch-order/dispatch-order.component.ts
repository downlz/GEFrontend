import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CityService } from '../../services/city.service';
import { UserService } from '../../services/user.service';
// import { TransportRateService } from '../../services/transportrate.service';
import { DispatchService } from '../../services/dispatch.service';

@Component({
  selector: 'app-dispatch-order',
  templateUrl: './dispatch-order.component.html',
  styleUrls: ['./dispatch-order.component.scss']
})
export class DispatchOrderComponent implements OnInit {
  form: FormGroup;
  seller: any;
  itemnames: any;
  categories: any;
  units: any;
  cities: any;
  states: any;
  edit: boolean;
  loading: boolean = true;
  submitted: boolean;
  id: string;
  allFormControls: any;
  formControls: any;
  userid: string;
  role:string;

  constructor(private auth: AuthService, 
    private dispatchService: DispatchService, private userService: UserService,
    private router: Router, private route: ActivatedRoute) {
    this.allFormControls = {

      orderno: new FormControl('', [
        Validators.required,
      ]),
      vehicleno: new FormControl('', [
        Validators.required,
      ]),
      dispatchtime: new FormControl('', [
        Validators.required,
      ]),
      transportcost: new FormControl(0, [
        Validators.required,
      ]),
      vehicledtl: new FormControl('', [
        Validators.maxLength(50)
      ]),
    };
    this.route.paramMap
      .subscribe(async params => {
        const id = params.get('id');
        if (id) {
          this.id = id;
          this.edit = true;
          // await this.getTransport(id);
        } else {
          this.edit = false;
        }
        this.initializeForm();
      });
    this.role = this.auth.getRole();
    this.userService.get('me')
      .subscribe(response => {
        const res = response as any;
        this.userid = res._id;
      }, (error: Response) => {
        this.router.navigate(['/errorpage']);
        if (error.status === 400) {
          alert(' expected error, post already deleted');
        }
        console.log(error);
      });

  }

  initializeForm() {
    let controls: any;
      controls = [
        'orderno',
        'vehicleno',
        'vehicledtl',
        'transportcost',
        'dispatchtime'
      ];

    const formControls = {};
    controls.map(control => {
      if (control) {
        formControls[control] = this.allFormControls[control];
      }
    });
    this.formControls = formControls;
    this.form = new FormGroup({
      dispatchForm: new FormGroup(formControls)
    });
  }

  ngOnInit() {
    // this.cityService.getAll()
    //   .subscribe(response => {
    //     this.cities = response;
    //   });
    this.route.paramMap
      .subscribe(async params => {
        const id = params.get('id');
        if (id) {
          this.id = id;
          this.edit = true;
          await this.dispatchService.get(id);
        } else {
          this.edit = false;
        }
        this.initializeForm();
      }
      );
  }

  save(event) {
    this.submitted = true;
    event.preventDefault();
    if (this.form.valid) {
      const dispatchdata = this.form.getRawValue().dispatchForm;
      // console.log(dispatchdata);
      if (this.edit) {
        // dispatchdata._id = this.id;
        
      } else {
        dispatchdata.addedby = this.userid;
        // delete transportrate.source;
        // delete transportrate.destination;

        // this.loading = true;
        // console.log(dispatchdata);
        this.dispatchService.create(dispatchdata).subscribe((response) => {
          // this.loading = false;
          alert('Vehicle data added successfully');
          this.router.navigate(['/transport/dispatch']);
        }, err => {
          console.log(err);
          // this.loading = false;
          alert('There was a server error while listing this transport rate');
        });
      }
    }
  }

}