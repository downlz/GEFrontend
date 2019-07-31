import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
// import { animate, state, style, transition, trigger } from '@angular/animations';
import {ActivatedRoute, Router} from '@angular/router';
// import {AuctionService} from '../services/auction.service';
import {forkJoin} from 'rxjs';
import {AuthService} from '../../services/auth.service';
// import {ManufacturerService} from '../services/manufacturer.service';
import { CityService } from '../../services/city.service';
import { TransportRateService } from '../../services/transportrate.service';

@Component({
  selector: 'app-find-transport',
  templateUrl: './find-transport.component.html',
  styleUrls: ['./find-transport.component.scss']
})
export class FindTransportComponent implements OnInit {
  form: FormGroup;
  auction: any;
  listing: any;
  // activeTab: string = 'dispatchDetails';
  loading: boolean = true;
  role: string;
  userId: string;
  cities: any;
  pageSize = 15;
  currentPage = 1;
  data: Array<any>;
  totalPages: Array<Number> = [];
  allFormControls: any;
  formControls: any;
  searchresult : boolean = false;
  gettransportrates : any;
  formvisible : boolean = true;
  isCollapsed: boolean = true;

  // animations: [
  //   trigger('detailExpand', [
  //     state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
  //     state('expanded', style({ height: '*' })),
  //     transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  //   ]),
  // ],

  constructor(private route: ActivatedRoute, private cityService : CityService,
    private auth: AuthService, private transportRate: TransportRateService,
    private router: Router) {
    
      this.allFormControls = {
      source: new FormControl('', [
        Validators.required,
      ]),
      destination: new FormControl('', [
        Validators.required,
      ])
    };
  }

  initializeForm() {
    let controls: any;
    this.searchresult = false;
      controls = [
        'source',
        'destination'
      ];
    const formControls = {};
    controls.map(control => {
      if (control) {
        formControls[control] = this.allFormControls[control];
      }
    });
    this.formControls = formControls;
    this.form = new FormGroup({
      getTransportRate: new FormGroup(formControls)
    });
    this.loading = false;
  }
  
  ngOnInit() {
    // this.loading = true;
    this.cityService.getAll()
      .subscribe(response => {
        this.cities = response;
      });

    this.role = this.auth.getRole();
    this.userId = this.auth.getId();
    this.initializeForm();
    // this.searchresult = false;
  }

  search(event) {
    // this.submitted = true;
    event.preventDefault();
    if (this.form.valid) {
      const transportrate = this.form.getRawValue().getTransportRate;
        // this.loading = true;
        // console.log(transportrate);
      this.transportRate.findtransport(transportrate.source,transportrate.destination).subscribe((response) => {
        this.formvisible = false;
        this.searchresult = true;
        // this.isCollapsed = true;
        this.loading = false;
        this.gettransportrates = response as any;
        this.setTotalPages();
        this.onPageChange(this.currentPage);
          // this.loading = false;
          // alert('Transport rate added successfully');
          // this.router.navigate(['/transport/add']);
        }, err => {
          console.log(err);
          this.loading = false;
          alert('There was a server error while listing this transport rate');
        });
      }
  }

  onPageChange(page) {
    this.data = [...(this.gettransportrates || [])];
    this.data = this.data.splice((page - 1) * this.pageSize, this.pageSize);
    this.currentPage = page;
  }

  setTotalPages() {
    const length = (this.gettransportrates || []).length;
    // console.log(length);
    // console.log(this.gettransportrates)
    if (length > 0) {
      const pages = (length % this.pageSize) === 0 ? (length / this.pageSize) : Math.floor(length / this.pageSize) + 1;
      this.totalPages = Array(pages).fill(0).map((x, i) => i + 1);
    }
  }

}
