import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidators} from '../login/login-form.validators';
import {CityService} from '../services/city.service';
import {StateService} from '../services/state.service';
import {UnitService} from '../services/unit.service';
import {GroupBuyingService} from '../services/groupbuying.service';
import {CategoryService} from '../services/category.service';
import {ItemnameService} from '../services/itemname.service';
import {ListingService} from '../services/listing.service';
// import {ManufacturerService} from '../services/manufacturer.service';
import { forkJoin } from 'rxjs';
import {UserService} from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppError } from '../common/app-error';

@Component({
  selector: 'app-listgb-item',
  templateUrl: './listgb-item.component.html',
  styleUrls: ['./listgb-item.component.scss']
})
export class ListGBItemComponent implements OnInit {
  // var itemarr;
  form = new FormGroup({
    listgb: new FormGroup({
      // 'name' : new FormControl('', [Validators.required,
      //   Validators.minLength(3),
      //   Validators.maxLength(50)]),
      // 'email' : new FormControl('', [Validators.email]),
      // 'phone' : new FormControl('', [Validators.required, Validators.minLength(10),
      //   Validators.maxLength(10), Validators.pattern('^[0-9]*$'),
      //   FormValidators.cannotContainSpace],
      //   FormValidators.shouldBeUnique),
      // 'password' : new FormControl('', [Validators.required, Validators.minLength(8)]),
      // 'pan' : new FormControl(),
      // 'GST' : new FormControl('', [Validators.required]),
      // 'address' : new FormControl('', [Validators.required]),
      // 'city' : new FormControl('', [Validators.required]),
      // 'state' : new FormControl('', [Validators.required]),
      // 'pin' : new FormControl('', [Validators.required])
      // itemid : FormControl(''),
      category : new FormControl(''),
      itemname : new FormControl(''),
      unit : new FormControl(''),
      sampleno : new FormControl(''),
      starttime : new FormControl(''),
      endtime : new FormControl(''),
      dealprice : new FormControl(''),
      moq : new FormControl(''),
      maxqty : new FormControl(''),
      totalqty : new FormControl(''),
      taxrate : new FormControl(''),
      remarks : new FormControl(''),
      isactive : new FormControl(''),
    })
  });
// var itemarr: any;
  cities: any;
  states: any;
  units: any;
  categories: any;
  itemnames: any;
  loginData: any;
  listings: any;
  // itemId: any;
  item: any;
  itemname: any;
  category: any;
  grade: any;
  origin: any;
  city: any;
  graincount: any;
  icumsa: any;
  moisture: any;
  address: any;
  itemarr: any;
  image: any;
  seller: any;
  manufacturer: any;

  constructor(private stateService: StateService, private cityService: CityService,
    private user: UserService, private unitService: UnitService,private listingService: ListingService,
    private categoryService: CategoryService,private groupbuyingService: GroupBuyingService,
    private itemnameService: ItemnameService, private router: Router) { }

  ngOnInit() {

    forkJoin([this.cityService.getAll(), this.stateService.getAll(),
      this.unitService.getAll(),this.listingService.getAll(''),this.itemnameService.getAll()])   // Needs to pass params for filters
    .subscribe(response => {
      this.cities = response[0];
      this.states = response[1];
      this.units = response[2];
      this.listings  = response[3];
      this.itemnames = response[4];
      // console.log(this.listings);
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });
  }

  get sampleno () {
    return this.form.get('listgb.sampleno');
  }
  //
  get itemId () {
    return this.form.get('listgb.item');
  }
  //
  // get qty () {
  //   return this.form.get('listgb.qty');
  // }
  //
  get unit () {
    return this.form.get('listgb.unit');
  }
  //
  // get seller () {
  //   return this.form.get('listgb.seller');
  // }
  //
  // get origin () {
  //   return this.form.get('listgb.origin');
  // }
  //
  // get city () {
  //   return this.form.get('listgb.city');
  // }
  //
  // get address () {
  //   return this.form.get('listgb.address');
  // }
  //
  // get icumsa () {
  //   return this.form.get('listgb.icumsa');
  // }
  //
  // get manufacturer () {
  //   return this.form.get('listgb.manufacturer');
  // }

  // onSampleNoChange(ac,listarr){
  //   // console.log("Hello");
  //   console.log(listarr[2]);
  // };
  
  onItemChange(datain2) {
    let item = this.form.get('listgb.itemname').value;
    this.categories = [];
    this.listings = [];
    this.categoryService.getCategoriesByItem(item).subscribe((response) => {
      this.categories = response;
    }, (error: Response) => {
      console.log(error);
    });

  }

  onCategoryChange(datain) {
    this.listings = [];
    let category = this.form.get('listgb.category').value;
    this.listingService.getListingsByCategory(category).subscribe((response) => {
      this.listings = response;
      console.log(this.listings);
    }, (error: Response) => {
      console.log(error);
    });
  }

  onSampleNoChange(sampleno,listarr) {
    var itemarr;
    listarr.forEach(function(value){                    // Improve coding standards
       if (value._id == sampleno) {
         itemarr = value;
       }
    })

    this.item = itemarr.name.name;
    this.category = itemarr.category.name;
    this.grade = itemarr.grade;
    this.origin = itemarr.origin;
    this.seller = itemarr.seller.name;
    // this.itemId = itemarr._id;
    // this.form('listgb.itemId').setValue(itemarr._id);
    // console.log(itemarr._id);
    // this.address = itemarr.seller.Addresses.text + ' ' + itemarr.seller.Addresses.city.name ;
    // this.image = itemarr.image;
    // this.manufacturer = itemarr.manufacturer.name;
    // console.log(itemarr);
  };

  listgbitem() {
  // console.log(itemarr);
// console.log(itemId)
    const formData = {
      itemId:  this.form.value.listgb.sampleno,
      // itemId:   this.form.value.listgb.itemId,
      dealprice:  this.form.value.listgb.dealprice,
      moq:   this.form.value.listgb.moq,
      maxqty:    this.form.value.listgb.maxqty,
      totalqty:    this.form.value.listgb.totalqty,
      taxrate:    this.form.value.listgb.taxrate,
      unitId:   this.form.value.listgb.unit,
      remarks:  this.form.value.listgb.remarks,
      isactive:    this.form.value.listgb.isactive,
      gbstarttime: this.form.value.listgb.starttime,
      gbendtime: this.form.value.listgb.endtime
    };

    // console.log(formData);

    this.groupbuyingService.create(formData)
    .subscribe(response => {
      // this.loginData = response;;
      alert('GB Listing Successful');
      this.router.navigate(['/groupBuying'
    ]);         // Link to Page product listings
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
