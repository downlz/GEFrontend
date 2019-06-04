import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, ValidationErrors, ValidatorFn, AbstractControl} from '@angular/forms';
import {CategoryService} from '../../services/category.service';
import {ItemnameService} from '../../services/itemname.service';
import {ActivatedRoute, Router} from '@angular/router';
import {forkJoin} from 'rxjs';
import {UnitService} from '../../services/unit.service';
import {UserService} from '../../services/user.service';
import {UsersellerService} from '../../services/seller.service';
import {BuyerService} from '../../services/buyer.service';
import {ListingService} from '../../services/listing.service';
import {AuthService} from '../../services/auth.service';
import {AuctionService} from '../../services/auction.service';
import {StateService} from '../../services/state.service';


@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.scss']
})
export class CreateAuctionComponent implements OnInit {
  form: FormGroup;
  seller: any;
  itemnames: any;
  categories: any;
  units: any;
  sellers: any;
  buyers: any;
  listings: any;
  role: string;
  submitted: boolean;
  loading: boolean;
  states: any;
  edit: boolean;
  id: string;
  maxStartDateTime: Date;
  maxEndDateTime: Date;
  allFormControls: any;
  formControls: any;

  constructor(private categoryService: CategoryService,
              private itemnameService: ItemnameService,
              private unitService: UnitService,
              private sellerService: UsersellerService,
              private buyerService: BuyerService,
              private listingService: ListingService,
              private auth: AuthService,
              private auctionService: AuctionService,
              private stateService: StateService,
              private router: Router,
              private route: ActivatedRoute
  ) {
    this.allFormControls = {

      sampleNo: new FormControl('', [
        Validators.required,
      ]),
      availableQty: new FormControl(0, [
        Validators.required,
        Validators.min(1)
      ]),
      minQty: new FormControl(0, [
        Validators.required,
        Validators.min(1),
        (control: AbstractControl) => Validators.max(this.form ? this.form.get('newItem.availableQty').value : 0)(control)
      ]),
      maxQty: new FormControl(0, [
        Validators.required,
        (control: AbstractControl) => {
          console.log('Validating', this.form);
          return Validators.min(this.form ? this.form.get('newItem.minQty').value : 0)(control);
        },
        (control: AbstractControl) => Validators.max(this.form ? this.form.get('newItem.availableQty').value : 0)(control)
      ]),
      unit: new FormControl('', [
        Validators.required
      ]),
      floorPrice: new FormControl('', [
        Validators.required,
      ]),
      ceilingPrice: new FormControl('', [
        Validators.required,
      ]),
      nameVisible: new FormControl(1, [
        Validators.required,
      ]),
      startTime: new FormControl(new Date(), [
        Validators.required
      ]),
      endTime: new FormControl(new Date(), [
        Validators.required
      ]),
      // seller: new FormControl(null),

      transportCost: new FormControl(0, [
        Validators.required,
      ]),
      address: new FormControl('', [
        Validators.required
      ]),
      pincode: new FormControl('', [
        Validators.required
      ]),
      state: new FormControl('', [
        Validators.required
      ]),
      auctionType: new FormControl('seller', [
        Validators.required,
      ]),
      remarks: new FormControl('', [
        //Validators.required,
      ]),
      itemName: new FormControl(''),
      itemCategory: new FormControl('', [
        Validators.required,
      ]),
      buyer: new FormControl('', [
        (control: AbstractControl) => this.form && this.form.get('newItem.auctionType').value === 'buyer' ? Validators.required(control) : null
      ])
    };
    this.maxStartDateTime = new Date();
    this.maxStartDateTime.setTime(this.maxStartDateTime.getTime() + 1000 * 60 * 60 * 24 * 30);
    this.maxEndDateTime = new Date();
    this.maxEndDateTime.setTime(this.maxEndDateTime.getTime() + 1000 * 60 * 60 * 24 * 37);
    this.route.paramMap
      .subscribe(async params => {
          const id = params.get('id');
          if (id) {
            this.id = id;
            this.edit = true;
            await this.getAuction(id);
          } else {
            this.edit = false;
          }

          this.initializeForm();
        }
      );

  }

  initializeForm(auctionType?: string) {
    const role = this.auth.getRole();
    this.role = role;
    let controls: any;

    switch (this.role) {
      case  'admin':
        auctionType = auctionType || 'seller';
        if (!this.edit) {
          controls = [
            'auctionType',
            'itemName',
            'itemCategory',
            'sampleNo',
            'availableQty',
            auctionType === 'seller' ? 'maxQty' : null,
            auctionType === 'seller' ? 'minQty' : null,
            'unit',
            'floorPrice',
            auctionType === 'seller' ? 'ceilingPrice' : null,
            'nameVisible',
            'startTime',
            'endTime',
            'transportCost',
            'address',
            'state',
            'pincode',
            'buyer',
            'remarks'
          ];
        } else {
          controls = [
            'availableQty',
            'maxQty',
            'minQty',
            'floorPrice',
            'ceilingPrice',
            'transportCost',
          ];
        }
        break;
      case  'seller':
        if (!this.edit) {
          controls = [
            'itemName',
            'itemCategory',
            'sampleNo',
            'availableQty',
            'maxQty',
            'minQty',
            'unit',
            'floorPrice',
            'ceilingPrice',
            'nameVisible',
            'startTime',
            'endTime',
            'transportCost',
            'address',
            'state',
            'pincode',
            'remarks'

          ];
        } else {
          controls = [
            'availableQty',
            'maxQty',
            'minQty',
            'floorPrice',
            'ceilingPrice',
            'transportCost',
          ];
        }
        break;
      case  'buyer':
        if (!this.edit) {
          controls = [
            'itemName',
            'itemCategory',
            'sampleNo',
            'availableQty',
            'unit',
            'floorPrice',
            'nameVisible',
            'startTime',
            'endTime',
            'transportCost',
            'address',
            'state',
            'pincode',
            'remarks'
          ];
        } else {
          controls = [
            'availableQty',
            'floorPrice',
            'transportCost',
          ];
        }
        break;
    }
    const formControls = {};
    controls.map(control => {
      if (control) {
        formControls[control] = this.allFormControls[control];
      }
    });
    this.formControls = formControls;
    this.form = new FormGroup({
      newItem: new FormGroup(formControls)
    });
  }

  ngOnInit() {
    if (this.role === 'admin') {
      forkJoin([this.itemnameService.getAll(), this.unitService.getAll(), this.sellerService.getAll(), this.buyerService.getAll(),
        this.stateService.getAll()
      ])
        .subscribe(response => {
          this.itemnames = response[0];
          this.units = response[1];
          this.sellers = response[2];
          this.buyers = response[3];
          this.states = response[4];
        }, (error: Response) => {
          console.log(error);
        });
    } else if (this.role === 'buyer') {
      forkJoin([this.itemnameService.getAll(), this.unitService.getAll(),
        this.stateService.getAll()
      ])
        .subscribe(response => {
          this.itemnames = response[0];
          this.units = response[1];
          this.states = response[2];
        }, (error: Response) => {
          console.log(error);
        });
    } else {
      forkJoin([this.unitService.getAll(), this.listingService.getCurrentUserListings(), this.stateService.getAll(), this.itemnameService.getAll()

      ])
        .subscribe(response => {
          this.units = response[0];
          this.listings = response[1];
          this.states = response[2];
          this.itemnames = response[3];
        }, (error: Response) => {
          console.log(error);
        });
    }
  }

  onAuctionTypeChange() {
    const item = this.form.get('newItem.auctionType').value;
    this.initializeForm(item);
  }

  onItemChange(datain2) {
    const item = this.form.get('newItem.itemName').value;
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
    let category = this.form.get('newItem.itemCategory').value;
    this.listingService.getListingsByCategory(category).subscribe((response: any) => {
      if (this.role === 'seller') {

        this.listings = (response || []).filter((listing) => {
          return listing.seller._id === this.auth.getId();
        });
      } else {
        this.listings = response;
      }
      // console.log(this.listings);
    }, (error: Response) => {
      console.log(error);
    });
  }

  onSampleNoChange() {
    const sample = this.form.get('newItem.sampleNo').value;
    const listing = this.listings.find((obj) => obj.id = sample);
    this.seller = listing.seller;
  }

  save(event) {
    this.submitted = true;
    event.preventDefault();
    if (this.form.valid) {
      const auction = this.form.getRawValue().newItem;
      if (auction.nameVisible === '0') {
        auction.nameVisible = false;
      } else {
        auction.nameVisible = true;
      }
      // console.log(auction.transportCost);
      if (auction.transportCost === '0') {
        auction.transportCost = false;
      } else {
        auction.transportCost = true;
      }
      if (this.edit) {
        auction._id = this.id;
        this.auctionService.update(auction).subscribe((response) => {
          this.loading = false;
          alert('Auction listed successfully');
          this.router.navigate(['/auction']);

        }, err => {
          this.loading = false;
          alert('There was a server error while listing this item for auction');
        });
      } else {
        if (this.role === 'buyer') {
          auction.auctionType = 'buyer';
          auction.user = this.auth.getId();
        } else if (this.role === 'seller') {
          auction.auctionType = 'seller';
          auction.user = this.auth.getId();
        } else {
          auction.auctionType = auction.auctionType || 'seller';
          if (auction.auctionType === 'seller') {
            auction.user = this.seller._id;
          } else {
            auction.user = auction.buyer;
          }
        }
        if (auction.remarks && auction.remarks === '') {
          auction.remarks = ' ';
        }

        delete auction.buyer;
        delete auction.seller;
        this.loading = true;
        this.auctionService.create(auction).subscribe((response) => {
          this.loading = false;
          alert('Auction listed successfully');
          this.router.navigate(['/auction']);

        }, err => {
          console.log(err);
          this.loading = false;
          alert('There was a server error while listing this item for auction');
        });
      }
    }
  }

  getErrors(name) {
    if (!this.form.controls.newItem['controls'][name]) {
      return {};
    } else {
      return this.form.controls.newItem['controls'][name].errors || {};
    }
  }

  getAuction(id) {
    this.loading = true;
    this.auctionService.get(id).subscribe((auction) => {
      const currentTimestamp = new Date().getTime();
      const startTime = new Date(auction['startTime']).getTime();
      if (currentTimestamp >= startTime) {
        alert('This auction is not editable now');
        this.router.navigate(['/auction']);
      }
      this.form.controls.newItem['controls'].availableQty.setValue(auction['availableQty']);
      if (auction['auctionType'] === 'seller') {
        this.form.controls.newItem['controls'].minQty.setValue(auction['minQty']);
        this.form.controls.newItem['controls'].maxQty.setValue(auction['maxQty']);
        this.form.controls.newItem['controls'].ceilingPrice.setValue(auction['ceilingPrice']);
      }
      this.form.controls.newItem['controls'].floorPrice.setValue(auction['floorPrice']);
      this.form.controls.newItem['controls'].transportCost.setValue(auction['transportCost'] ? 1 : 0);
      this.loading = false;
    }, error => {
      // this.router.navigate(['/errorpage']);
      // if (error.status === 400) {
      //   alert(' expected error, post already deleted');
      // }
      this.loading = false;
      console.log(error);
    });
  }

}
