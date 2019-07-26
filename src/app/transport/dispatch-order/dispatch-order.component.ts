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
        Validators.required
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

  // onCapacityChange() {
  //   const capacity = this.form.get('dispatchForm.capacity').value;
  //   this.initializeForm(capacity);
  // }

  // getTransport(id) {
  //   // this.loading = true;
  //   // console.log('ia m here');
  //   this.transportRate.get(id).subscribe((transport) => {
  //     // console.log(transport);
  //     // const currentTimestamp = new Date().getTime();
  //     // const startTime = new Date(auction['startTime']).getTime();
  //     // if (currentTimestamp >= startTime) {
  //     //   alert('This auction is not editable now');
  //     //   this.router.navigate(['/auction']);
  //     // }
  //     this.form.controls.dispatchForm['controls'].duration.setValue(transport['duration']);
  //     // if (auction['auctionType'] === 'seller') {
  //     this.form.controls.dispatchForm['controls'].pricequote.setValue(transport['pricequote']);
  //     this.form.controls.dispatchForm['controls'].vehicledtl.setValue(transport['vehicledtl']);
  //     this.form.controls.dispatchForm['controls'].isactive.setValue(transport['isactive']);
  //     // }
  //     // this.form.controls.dispatchForm['controls'].floorPrice.setValue(auction['floorPrice']);
  //     // this.form.controls.dispatchForm['controls'].transportCost.setValue(auction['transportCost'] ? 1 : 0);
  //     // this.loading = false;
  //   }, error => {
  //     this.router.navigate(['/errorpage']);
  //     if (error.status === 400) {
  //       alert(' expected error, post already deleted');
  //     }
  //     // this.loading = false;
  //     console.log(error);
  //   });
  // }

  save(event) {
    this.submitted = true;
    event.preventDefault();
    if (this.form.valid) {
      const dispatchdata = this.form.getRawValue().dispatchForm;
      // console.log(dispatchdata);
      if (this.edit) {
        // dispatchdata._id = this.id;
        // this.transportRate.update(dispatchdata).subscribe((response) => {
        //   // this.loading = false;
        //   alert('Transport rate updated successfully');
        //   this.router.navigate(['/transport/user']);

        // }, err => {
        //   // this.loading = false;
        //   alert('There was a server error while updating this transport rate');
        // });
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