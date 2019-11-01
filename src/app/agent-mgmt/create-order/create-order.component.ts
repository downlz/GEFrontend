import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, ValidationErrors, ValidatorFn, AbstractControl} from '@angular/forms';
import { FormValidators} from '../../login/login-form.validators';
import {CategoryService} from '../../services/category.service';
import {ItemnameService} from '../../services/itemname.service';
import {ActivatedRoute, Router} from '@angular/router';
import {forkJoin} from 'rxjs';
import {UnitService} from '../../services/unit.service';
import {UserService} from '../../services/user.service';
import {UsersellerService} from '../../services/seller.service';
// import {BuyerService} from '../../services/buyer.service';
import {ListingService} from '../../services/listing.service';
import {AuthService} from '../../services/auth.service';
import {AuctionService} from '../../services/auction.service';
import {StateService} from '../../services/state.service';
import {CityService} from '../../services/city.service';
// import { PriceService } from '../../services/price.service';
import { OrderService } from '../../services/order.service';
import { AppError } from '../../common/app-error';


@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
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
  cities: any
  edit: boolean;
  id: string;
  price = 0;
  priceValid = false;
  maxStartDateTime: Date;
  maxEndDateTime: Date;
  allFormControls: any;
  formControls: any;
  lastorderno: number;
  selecteditemprice: any;
  selecteditem: any;
  address: any;
  user: any;
  // itemid: any;
  userid: any;
  ordercost: number;

  constructor(private categoryService: CategoryService,
              private itemnameService: ItemnameService,
              private unitService: UnitService,
              private sellerService: UsersellerService,
              // private buyerService: BuyerService,
              private listingService: ListingService,
              private auth: AuthService,
              private auctionService: AuctionService,
              private stateService: StateService,
              private cityService: CityService,
              // private priceService: PriceService,
              private orderService: OrderService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute
  ) {
    this.allFormControls = {
      // 'itemName',
      //       'itemCategory',
      //       'sampleNo',
      //       'odrQty',
      //       'itemSeller',
      //       // auctionType === 'seller' ? 'minQty' : null,
      //       'buyername',
      //       'buyergstin',
      //       'buyerphone',
      //       'buyeraddress',
      //       'buyerpin',
      //       'buyerstate',
      //       'buyercity',
      //       'remarks'

      sampleNo: new FormControl('', [
        Validators.required,
      ]),
      odrQty: new FormControl(0, [
        Validators.required,
        Validators.min(1)
      ]),
      itemSeller: new FormControl(0, []),
      itemUnit: new FormControl(0,[]),
      buyername: new FormControl('', [
        Validators.required
      ]),
      buyergstin: new FormControl('', [ Validators.required,Validators.minLength(15),Validators.maxLength(15),FormValidators.cannotContainSpace ]),
      buyerphone: new FormControl('', [Validators.required, Validators.minLength(10),
          Validators.maxLength(15), Validators.pattern('^[0-9]*$'),
          FormValidators.cannotContainSpace
      ]),
      buyeraddress: new FormControl('', [
        Validators.required,Validators.minLength(5)
      ]),
      buyerpin: new FormControl('',[
        Validators.required,Validators.minLength(6),Validators.maxLength(6),FormValidators.cannotContainSpace
      ]),
      buyerstate: new FormControl('', [
        Validators.required
      ]),
      buyercity: new FormControl('', [
        Validators.required
      ]),
      paymentterms: new FormControl('Pre Dispatch',[
        Validators.required
      ]),
      remarks: new FormControl('', [
        //Validators.required,
      ]),
      itemName: new FormControl(''),
      itemCategory: new FormControl('', [
        Validators.required,
      ])
    };
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
          await this.initializeForm();
        }
      );

  }

  initializeForm() {
    const role = this.auth.getRole();
    this.role = role;
    let controls: any;

    // switch (this.role) {
    //   case  ('agent'):
        // auctionType = auctionType || 'seller';
        if (!this.edit) {
          controls = [
            // 'auctionType',
            'itemName',
            'itemCategory',
            'sampleNo',
            'odrQty',
            'itemSeller',
            'itemUnit',
            // auctionType === 'seller' ? 'minQty' : null,
            'buyername',
            'buyergstin',
            'buyerphone',
            'buyeraddress',
            'buyerpin',
            'buyerstate',
            'buyercity',
            'paymentterms',
            'remarks'
          ];
        } else {
          controls = [
            'buyername',
            'buyergstin',
            'buyerphone',
            'buyeraddress',
            'buyerpin',
            'buyerstate',
            'buyercity',
            'paymentterms',
            'remarks'
          ];
        }
      //   break;
      // case  'buyer':
      //   if (!this.edit) {
      //     controls = [
      //       'itemName',
      //       'itemCategory',
      //       'sampleNo',
      //       'odrQty',
      //       'itemSeller',
      //       // 'itemPrice',
      //       // 'availableQty',
      //       // auctionType === 'seller' ? 'maxQty' : null,
      //       // auctionType === 'seller' ? 'minQty' : null,
      //       // 'unit',
      //       // 'floorPrice',
      //       // auctionType === 'seller' ? 'ceilingPrice' : null,
      //       'buyername',
      //       'buyergstin',
      //       'buyerphone',
      //       'buyeraddress',
      //       'buyerpin',
      //     ];
      //   } else {
      //     controls = [
      //       'buyername',
      //       'buyergstin',
      //       'buyerphone',
      //       'buyeraddress',
      //       'buyerpin',
      //     ];
      //   }
      //   break;
    // }
    const formControls = {};
    controls.map(control => {
      if (control) {
        formControls[control] = this.allFormControls[control];
      }
    });
    this.formControls = formControls;
    this.form = new FormGroup({
      agentCreateOrder: new FormGroup(formControls)
    });
  }

  ngOnInit() {

    this.userService.get('me')
    .subscribe(response => {
      const res = response as any;
      this.user = res;
      this.userid = res._id;

    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    })

    if (this.role === 'admin' || this.role === 'agent') {
      forkJoin([this.itemnameService.getAll(), this.unitService.getAll()
        // , this.sellerService.getAll()
        ,this.stateService.getAll(),this.cityService.getAll()
      ])
        .subscribe(response => {
          this.itemnames = response[0];
          this.units = response[1];
          // this.sellers = response[2];
          this.states = response[2];
          this.cities = response[3];
        }, (error: Response) => {
          console.log(error);
        });
    // }  else {
    //   forkJoin([this.unitService.getAll(), this.listingService.getCurrentUserListings(), this.stateService.getAll(), this.itemnameService.getAll()

    //   ])
    //     .subscribe(response => {
    //       this.units = response[0];
    //       this.listings = response[1];
    //       this.states = response[2];
    //       this.itemnames = response[3];
    //     }, (error: Response) => {
    //       console.log(error);
    //     });
    }
  }

  // onAuctionTypeChange() {
  //   const item = this.form.get('agentCreateOrder.auctionType').value;
  //   this.initializeForm(item);
  // }

  onItemChange(datain2) {
    const item = this.form.get('agentCreateOrder.itemName').value;
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
    let category = this.form.get('agentCreateOrder.itemCategory').value;
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
    const sample = this.form.get('agentCreateOrder.sampleNo').value;
    const listing = this.listings.find((obj) => obj.id = sample);
    this.seller = listing.seller;
    this.selecteditem = listing;
    this.selecteditemprice = 'Rs.' + listing.price + '/' + listing.unit.mass;
    // console.log(listing);
  }

  onQuantityChange() {
    // console.log(qty);
    // console.log(this.selecteditem);
    const cost = this.selecteditem.price * this.form.getRawValue().agentCreateOrder.odrQty;;
    // console.log(cost);
    this.ordercost = cost;
    // const PriceData = {
    //   qty: qty,
    //   itemId: listing._id,
    // };
    // this.priceValid = false;
    // this.priceService.getPrice(PriceData)
    // .subscribe(Response => {
    //   const priceValue = Response as any;
    //   // this.price = priceValue.price;
    //   this.price = priceValue.price.toFixed(2);
    //   if (this.price < 0) {
    //       this.price = 0;
    //   } else {
    //     this.priceValid = true;
    //   }
    // }, (error: AppError) => {
    //   console.log(error);
    //   this.router.navigate(['/errorpage']);
    // });
  }

  save(event) {
    this.submitted = true;
    event.preventDefault();
    if (this.form.valid) {
      const auction = this.form.getRawValue().agentCreateOrder;
      if (auction.nameVisible === '0') {
        auction.nameVisible = false;
      } else {
        auction.nameVisible = true;
      }
      if (auction.transportCost === '0' || auction.transportCost === 0) {
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
    if (!this.form.controls.agentCreateOrder['controls'][name]) {
      return {};
    } else {
      return this.form.controls.agentCreateOrder['controls'][name].errors || {};
    }
  }

  order2(f){
    // console.log(f);
    const createOrder = this.form.getRawValue().agentCreateOrder;
    console.log(this.seller._id);
    console.log(createOrder);

  }

  order(f) {
    this.orderService.get('orderno')        // Sending url as per API defination
      .subscribe(response => {              // improve coding standards
        const res = response as any;
        this.lastorderno = parseInt(res[0].orderno) + 1;
    const createOrder = this.form.getRawValue().agentCreateOrder;  
    const shippingAddress = {
      partyname: createOrder.partyname,
      gstin: createOrder.partygstin,
      address : {
        text: createOrder.address,
        pincode: createOrder.pincode,
        state: createOrder.statedat,
        phone: createOrder.phone,
        addresstype: 'delivery'
      }
    }    

    const OrderData = {
      // orderno: (this.userid.substring(-1,5)  + this.listing.seller._id.substring(-1,5)).toUpperCase(),    // Frame a order no generator here
      orderno: String(this.lastorderno),
      quantity: createOrder.odrQty,
      unit: this.selecteditem.unit.mass,
      cost: createOrder.odrQty * this.selecteditem.price,
      price : this.selecteditem.price,
      itemId: this.selecteditem._id,
      // addressId: this.address._id,
      buyerId: this.userid,
      sellerId: this.selecteditem.seller._id,
      placedTime: Date.now().toString(),
      ordertype: 'agentorder',       // Try to make it dynamic
      status: 'new',
      // shippingdtl: shippingAddress,
      isshippingbillingdiff: true, //this.showShippingDetails,
      partyname: createOrder.buyername,
      gstin: createOrder.buyergstin,
      address: createOrder.buyeraddress,
      pincode: createOrder.buyerpin,
      state: createOrder.buyerstate,
      phone: createOrder.buyerphone,
      paymentterms: createOrder.paymentterms,
      addresstype: 'delivery',
      addedby: this.userid,
      // addressreference: shippingAddress.shipaddr,
      isExistingAddr: false,
    };
    this.orderService.create(OrderData)
    .subscribe(response => {
      alert('Order Placed Successfully');
      this.router.navigate(['/myOrders']);
    }, (error: AppError) => {
      console.log(error);
      this.router.navigate(['/errorpage']);
    });
})
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
      this.form.controls.agentCreateOrder['controls'].availableQty.setValue(auction['availableQty']);
      if (auction['auctionType'] === 'seller') {
        this.form.controls.agentCreateOrder['controls'].minQty.setValue(auction['minQty']);
        this.form.controls.agentCreateOrder['controls'].maxQty.setValue(auction['maxQty']);
        this.form.controls.agentCreateOrder['controls'].ceilingPrice.setValue(auction['ceilingPrice']);
      }
      this.form.controls.agentCreateOrder['controls'].floorPrice.setValue(auction['floorPrice']);
      this.form.controls.agentCreateOrder['controls'].transportCost.setValue(auction['transportCost'] ? 1 : 0);
      this.loading = false;
    }, error => {
      this.router.navigate(['/errorpage']);
      // if (error.status === 400) {
      //   alert(' expected error, post already deleted');
      // }
      // this.loading = false;
      console.log(error);
    });
  }

}
