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
import {AgentBuyerService} from '../../services/agentbuyer.service';
// import {BuyerService} from '../../services/buyer.service';
import {ListingService} from '../../services/listing.service';
import {AuthService} from '../../services/auth.service';
import {AuctionService} from '../../services/auction.service';
import {StateService} from '../../services/state.service';
import {CityService} from '../../services/city.service';
import {ItemService} from '../../services/item.service';
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
  cities: any;
  agentbuyer: any;
  edit: boolean;
  id: string;
  price = 0;
  priceValid = false;
  maxStartDateTime: Date;
  maxEndDateTime: Date;
  allFormControls: any;
  formControls: any;
  addNewBuyer: Boolean = false;
  lastorderno: number;
  selecteditemprice: any;
  selecteditem: any;
  address: any;
  user: any;
  item: any;
  // itemid: any;
  userid: any;
  ordercost: number;
  clicked: Boolean = false;

  constructor(private categoryService: CategoryService,
              private itemnameService: ItemnameService,
              private unitService: UnitService,
              private sellerService: UsersellerService,
              // private buyerService: BuyerService,
              private listingService: ListingService,
              private auth: AuthService,
              // private auctionService: AuctionService,
              private stateService: StateService,
              private cityService: CityService,
              // private priceService: PriceService,
              private orderService: OrderService,
              private userService: UserService,
              private itempost: ItemService,
              private agentBuyerService: AgentBuyerService,
              private router: Router,
              private route: ActivatedRoute
  ) {
    this.allFormControls = {
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
      buyeraddr: new FormControl(''),
      addNewBuyer: new FormControl(false),
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
            await this.getSampleNo(id);
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
            'remarks',
            'buyeraddr'
          ];
        } else {
          controls = [
            // Maybe find a usage in future currently set to same field
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
            'remarks',
            'buyeraddr'
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
        ,this.stateService.getAll(),this.cityService.getAll(),this.agentBuyerService.getAll()
      ])
        .subscribe(response => {
          this.itemnames = response[0];
          this.units = response[1];
          // this.sellers = response[2];
          this.states = response[2];
          this.cities = response[3];
          this.agentbuyer = response[4];

          if (this.role == 'agent') {
            var currentid = this.userid;
            var filteredBuyers =  this.agentbuyer.filter(function(buyerlist) {
              return buyerlist._id == currentid;
            });
            this.agentbuyer = filteredBuyers
          }

        }, (error: Response) => {
          console.log(error);
        });
    }
  }

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

  addNewBuyerCheck(){
    this.addNewBuyer = !this.form.get('agentCreateOrder.addNewBuyer').value;
    // console.log(this.addNewBuyer)
  }

  onSampleNoChange() {
    const sample = this.form.get('agentCreateOrder.sampleNo').value;
    const listing = this.listings.find((obj) => obj._id == sample);
    this.seller = listing.seller;
    this.selecteditem = listing;
    this.selecteditemprice = 'Rs.' + listing.price + '/' + listing.unit.mass;
  }

  onQuantityChange() {
    const cost = this.selecteditem.price * this.form.getRawValue().agentCreateOrder.odrQty;
    this.ordercost = cost;
  }

  getErrors(name) {
    if (!this.form.controls.agentCreateOrder['controls'][name]) {
      return {};
    } else {
      return this.form.controls.agentCreateOrder['controls'][name].errors || {};
    }
  }

  getSampleNo(id) {
      this.loading = true;
      this.itempost.get(id).subscribe((item) => {
        this.item = item;
        this.form.controls.agentCreateOrder['controls'].itemName.setValue(item['name']._id);
        this.form.controls.agentCreateOrder['controls'].itemCategory.setValue(item['category']._id);
        this.form.controls.agentCreateOrder['controls'].sampleNo.setValue(item['_id']);
        this.seller = item['seller'];
        this.edit = false;
        this.selecteditem = item;
        this.loading = false;
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }

  order(f) {
    this.clicked = true;
    const createOrder = this.form.getRawValue().agentCreateOrder;  
    // console.log(!createOrder.buyeraddr);
    // console.log(createOrder.addNewBuyer);
    // console.log(createOrder.buyeraddr);
    // if 
    // (createOrder.buyeraddr == null) {
    //     alert('Choose a buyer from the list to place an order')
    // } else 
    if (!createOrder.buyeraddr && (createOrder.buyername == '' ||
    createOrder.buyername == '' ||
    createOrder.buyergstin == '' ||
    createOrder.city == '' ||
    createOrder.pincode == '' ||
    createOrder.buyeraddress == '' ||
    createOrder.pincode == '')
    ) {
      alert('Please specify all fields for buyer details to proceed placing the order');
    } else if 
      (createOrder.odrQty < 1) {
        alert('Order Quantity is invalid.Please add a desired quantity');
    }else {
    const OrderData = {
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
      city: createOrder.buyercity,
      phone: createOrder.buyerphone,
      paymentterms: createOrder.paymentterms,
      addresstype: 'delivery',
      addedby: this.userid,
      addressreference: createOrder.buyeraddr ? createOrder.buyeraddr : '',
      isExistingAddr: false,
      remarks: createOrder.remarks
    };
    if (createOrder.buyeraddr) {
      OrderData.isshippingbillingdiff = true,
      OrderData.partyname = createOrder.buyeraddr.addressbasicdtl.partyname,
      OrderData.gstin = createOrder.buyeraddr.addressbasicdtl.gstin,
      OrderData.address =  createOrder.buyeraddr.text,
      OrderData.pincode = createOrder.buyeraddr.pin,
      // OrderData.state = f.buyeraddr.state,
      OrderData.city = createOrder.buyeraddr.city,
      OrderData.phone = createOrder.buyeraddr.phone,
      OrderData.addressreference = createOrder.buyeraddr._id,
      OrderData.addresstype =  'delivery',
      OrderData.isExistingAddr = true;
    }
    // console.log(OrderData)
    this.orderService.create(OrderData)
    .subscribe(response => {
      alert('Order Placed Successfully');
      this.router.navigate(['/myOrders']);
    }, (error: AppError) => {
      console.log(error);
      this.router.navigate(['/errorpage']);
    });
  }
}

}
