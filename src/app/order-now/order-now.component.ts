import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingService } from '../services/listing.service';
import { Listing } from './../model/listing';
import { UserService } from '../services/user.service';
import { StateService } from '../services/state.service';
import { OrderService } from '../services/order.service';
import { BargainService } from '../services/bargain.service';
import { AddressService } from '../services/address.service';
import { PriceService } from '../services/price.service';
import { AppError } from '../common/app-error';
import { forkJoin } from 'rxjs';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-now',
  templateUrl: './order-now.component.html',
  styleUrls: ['./order-now.component.scss']
})
export class OrderNowComponent implements OnInit {

  listing: Listing;
  address: any;
  user: any;
  itemid: any;
  userid: any;
  statedata: any;
  addresses: any;
  state: any = []; //Array<any> = [];
  hideblock: false;
  price = 0;
  priceValid = false;
  showShippingDetails: Boolean = false;
  lastorderno: number;
  bargainqty: number;
  bargain: any;
  isEligibleForBargain: Boolean = false;
  activeBargain: Boolean = false;
  constructor(private listingService: ListingService, private userService: UserService,
    private route: ActivatedRoute, private router: Router, private stateService: StateService,
    private orderService: OrderService, private modalService: NgbModal,
    private addressService: AddressService, private priceService: PriceService,
    private bargainService: BargainService) { }

  ngOnInit() {
    this.route.paramMap
    .subscribe(params => {
      const id = params.get('id');
      this.itemid = id;
      this.getProduct(id);
    });
    this.stateService.getAll()
    .subscribe(response => {
      this.state = response;
    });
    this.userService.get('me')
    .subscribe(response => {
      const res = response as any;
      this.user = res;
      this.address = res.Addresses[0];
      this.userid = res._id;
        this.addressService.getUserAddr(res._id,res.phone)
        .subscribe(response => {
          this.addresses = response;
          // console.log(response);
        },(error: Response) => {
          this.router.navigate(['/errorpage']);
          if (error.status === 400) {
            alert(' expected error, post already deleted');
          }
          console.log(error);
        });
        this.bargainService.getBuyerBargain(this.userid, this.itemid)
        .subscribe(response => {
          if (!response[0]) {
            this.activeBargain = false;
          } else {
            this.activeBargain = true;
            this.bargain = response[0];
            // console.log(this.bargain);
          }
          
        });


    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });
    
  }

  getProduct(id) {
    this.listingService.get(id)
    .subscribe(response => {
      this.listing = response as Listing;
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });
  }

  checkActiveBargain() {
    // Check user role and apply service call
    console.log(this.user);
    // if (userinfo.isBuyer === true) {
    //   console.log(userinfo);
    // }
    // this.bargainService.getPrice()
  }
  onQuantityChange(qty) {
    const PriceData = {
      qty: qty,
      itemId: this.listing._id,
      buyerId: this.userid,
      sellerId: this.listing.seller._id
    };
    this.priceValid = false;
    // Check bargain eligibility only if no bargain in progress
    if (this.activeBargain === false) {
      if ((qty > this.listing.bargaintrgqty) && (this.listing.bargainenabled === true)) {
        this.isEligibleForBargain = true;
        this.bargainqty = qty;
      } else {
        this.isEligibleForBargain = false;
      }
    }
    this.priceService.getPrice(PriceData)
    .subscribe(Response => {
      const priceValue = Response as any;
      // this.price = priceValue.price;
      this.price = priceValue.price.toFixed(2);
      if (this.price < 0) {
          this.price = 0;
      } else {
        this.priceValid = true;
      }
    }, (error: AppError) => {
      console.log(error);
      this.router.navigate(['/errorpage']);
    });
  }

  generateorderno(){           // To generate order id
    this.orderService.get('orderno')        // Sending url as per API defination
      .subscribe(response => {
        const res = response as any;
        this.lastorderno = res[0].orderno + 1;
      })  
      return this.lastorderno;
  }

  order(f) {
    // console.log(f.shipaddr);
    if (!f.partyname && !f.shipaddr) {
      alert("Specify a address from shipping address dropdown or add a new address");
    } else {
    this.orderService.get('orderno')        // Sending url as per API defination
      .subscribe(response => {              // improve coding standards
        const res = response as any;
        this.lastorderno = parseInt(res[0].orderno) + 1;
        // console.log(this.lastorderno);
      // })
    const shippingAddress = {
      partyname: f.partyname,
      gstin: f.partygstin,
      address : {
        text: f.address,
        pincode: f.pincode,
        state: f.statedat,
        phone: f.phone,
        addresstype: 'delivery'
      }
    }    

    const OrderData = {
      // orderno: (this.userid.substring(-1,5)  + this.listing.seller._id.substring(-1,5)).toUpperCase(),    // Frame a order no generator here
      orderno: String(this.lastorderno),
      quantity: f.quantity,
      unit: this.listing.unit.mass,
      cost: f.quantity * this.listing.price,
      price : this.listing.price,
      itemId: this.listing._id,
      addressId: this.address._id,
      buyerId: this.userid,
      sellerId: this.listing.seller._id,
      placedTime: Date.now().toString(),
      ordertype: 'regular',       // Try to make it dynamic
      status: 'new',
      // shippingdtl: shippingAddress,
      isshippingbillingdiff: this.showShippingDetails,
      partyname: f.partyname,
      gstin: f.partygstin,
      address: f.address,
      pincode: f.pincode,
      state: f.statedat,
      phone: f.phone,
      addresstype: 'delivery',
      addedby: this.userid,
      addressreference: f.shipaddr ? f.shipaddr : '',
      isExistingAddr: false
    };
    // console.log(OrderData);
    // console.log(f.shipaddr);
    if (f.shipaddr && f.shipaddr.addresstype === 'delivery') {
      OrderData.isshippingbillingdiff = true,
      OrderData.partyname = f.shipaddr.addressbasicdtl.partyname,
      OrderData.gstin = f.shipaddr.addressbasicdtl.gstin,
      OrderData.address =  f.shipaddr.text,
      OrderData.pincode = f.shipaddr.pin,
      OrderData.state = f.shipaddr.state,
      OrderData.phone = f.shipaddr.phone,
      OrderData.addresstype =  'delivery',
      OrderData.addressreference = f.shipaddr
      OrderData.isExistingAddr = true;
    }
    // console.log(OrderData);
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
  }
}