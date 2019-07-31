import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, ValidationErrors, ValidatorFn, AbstractControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
// import {forkJoin} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import { CityService } from '../../services/city.service';
import { UserService } from '../../services/user.service';
import { TransportRateService } from '../../services/transportrate.service';

@Component({
  selector: 'app-list-transport-rate',
  templateUrl: './list-transport-rate.component.html',
  styleUrls: ['./list-transport-rate.component.scss']
})
export class ListTransportRateComponent implements OnInit {
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
  formControls: any;
  userid: string;
  transportEdit: any;
  constructor(private auth: AuthService,private cityService: CityService,
              private transportRate: TransportRateService,private userService: UserService,
              private router: Router,private route: ActivatedRoute) { 
    this.allFormControls = {

      source: new FormControl('', [
        Validators.required,
      ]),
      destination: new FormControl('', [
        Validators.required,
      ]),
      capacity: new FormControl('', [
        Validators.required,
      ]),
      carryingCap: new FormControl(0, [
        Validators.required,
        ]),
      tonnagein: new FormControl('Tonne', [
        Validators.required
      ]),
      duration: new FormControl('', [
        Validators.required,
      ]),
      pricequote: new FormControl('', [
        Validators.required,
      ]),
      vehicledtl: new FormControl('', [
        Validators.maxLength(50)
      ]),
      isactive: new FormControl('true', [
        Validators.required,
      ])
    };
    this.route.paramMap
      .subscribe(async params => {
        const id = params.get('id');
        if (id) {
          this.id = id;
          this.edit = true;
          await this.getTransport(id);
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

  initializeForm(capacity?: string) {
    let controls: any;
    if (!this.edit) {
    if (capacity === 'custom') {
      controls = [
        'source',
        'destination',
        'capacity',
        'carryingCap',
        'tonnagein',
        'duration',
        'pricequote',
        'vehicledtl'
      ];
    } else {
      controls = [
        'source',
        'destination',
        'capacity',
        'duration',
        'pricequote',
        'vehicledtl'
      ];
    }
  } else {
      controls = [
        'duration',
        'pricequote',
        'vehicledtl',
        'isactive'
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
      newTransportRate: new FormGroup(formControls)
    });
  }

  ngOnInit() {
    this.cityService.getAll()
    .subscribe(response => {
      this.cities = response;
    });
    this.route.paramMap
      .subscribe(async params => {
        const id = params.get('id');
        if (id) {
          this.id = id;
          this.edit = true;
          await this.transportRate.get(id);
        } else {
          this.edit = false;
        }
        this.initializeForm();
      }
      );
  }

  onCapacityChange() {
    const capacity = this.form.get('newTransportRate.capacity').value;
    this.initializeForm(capacity);
  }

  getTransport(id) {
    // this.loading = true;
    // console.log('ia m here');
    this.transportRate.get(id).subscribe((transport) => {
      this.transportEdit = transport;
      // console.log(this.transportEdit);
      // const currentTimestamp = new Date().getTime();
      // const startTime = new Date(auction['startTime']).getTime();
      // if (currentTimestamp >= startTime) {
      //   alert('This auction is not editable now');
      //   this.router.navigate(['/auction']);
      // }
      this.form.controls.newTransportRate['controls'].duration.setValue(transport['duration']);
      // if (auction['auctionType'] === 'seller') {
      this.form.controls.newTransportRate['controls'].pricequote.setValue(transport['pricequote']);
      this.form.controls.newTransportRate['controls'].vehicledtl.setValue(transport['vehicledtl']);
      // this.form.controls.newTransportRate['controls'].isactive.setValue(transport['isactive']);
      // }
      // this.form.controls.newTransportRate['controls'].floorPrice.setValue(auction['floorPrice']);
      // this.form.controls.newTransportRate['controls'].transportCost.setValue(auction['transportCost'] ? 1 : 0);
      // this.loading = false;
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
      const transportrate = this.form.getRawValue().newTransportRate;
      // console.log(transportrate);
      if (this.edit) {
        transportrate._id = this.id;
        this.transportRate.update(transportrate).subscribe((response) => {
          // this.loading = false;
          alert('Transport rate updated successfully');
          this.router.navigate(['/transport/user']);

        }, err => {
          // this.loading = false;
          alert('There was a server error while updating this transport rate');
        });
      } else {
        transportrate.fromId = transportrate.source;
        transportrate.toId = transportrate.destination;
        transportrate.tonnagein = 'Tonne';
        transportrate.addedby = this.userid;
        delete transportrate.source;
        delete transportrate.destination;

        // this.loading = true;
        // console.log(transportrate);
        this.transportRate.create(transportrate).subscribe((response) => {
          // this.loading = false;
          alert('Transport rate added successfully');
          this.router.navigate(['/transport/user']);

        }, err => {
          console.log(err);
          // this.loading = false;
          alert('There was a server error while listing this transport rate');
        });

      }
    }
  }

}
