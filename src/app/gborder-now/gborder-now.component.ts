import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {GBListingService} from '../services/gblisting.service';
import { GBListing } from '../model/gblisting';
import { UserService } from '../services/user.service';
// import { UnitService } from '../services/unit.service';
import { OrderService } from '../services/order.service';
import { PriceService } from '../services/price.service';
import { AppError } from '../common/app-error';
import { Response } from 'selenium-webdriver/http';

@Component({
  selector: 'app-gborder-now',
  templateUrl: './gborder-now.component.html',
  styleUrls: ['./gborder-now.component.scss']
})
export class GBOrderNowComponent implements OnInit {

  gblisting: GBListing;
  availableqty: number;
  address: any;
  userid: any;
  price = 0;
  priceValid = false;
  exceededMaxQty : Boolean = false;
  exceededAvlQty : Boolean = false;
  belowMinQty: Boolean = false;
  referenceGBId: any;
  lastorderno: number;
  id: any;
  constructor(private gblistingService: GBListingService, private userService: UserService,
    private route: ActivatedRoute, private router: Router, private orderService: OrderService,
    // private unitService: UnitService,
    private priceService: PriceService) { }

  ngOnInit() {
    this.route.paramMap
    .subscribe(params => {
      const id = params.get('id');
      this.getProduct(id);

      this.gblistingService.getAvlQty(id)
        .subscribe(response => {
          const res = response as any;
          this.availableqty = res.availableQty
        });
    });

    this.userService.get('me')
    .subscribe(response => {
      const res = response as any;
      this.address = res.Addresses[0];
      this.userid = res._id;
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });
  }

  getProduct(id) {
    this.gblistingService.get(id)
    .subscribe(response => {
      // console.log(response);
      this.gblisting = response as GBListing;
      // console.log(this.gblisting);
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });
    
  }

  onQuantityChange(qty) {
    this.exceededMaxQty = false;          // reset post every change
    this.exceededAvlQty = false;          // reset post every change
    this.belowMinQty = false;
    const PriceData = {
      qty: qty,
      itemId: this.gblisting.item._id,
      buyerId: this.userid,
      sellerId: this.gblisting.item.seller._id
    };
    // this.priceValid = false;
    this.priceService.getPrice(PriceData)
    this.price = qty * this.gblisting.dealprice;
    // this.price = parseInt(this.price.toFixed(2));
    this.priceValid = true;
    if (qty > this.gblisting.maxqty) {
      this.exceededMaxQty = true;
      this.priceValid = false;
    } else if (qty > this.availableqty) {
      this.exceededAvlQty = true;
      this.priceValid = false;
    } else if (qty < this.gblisting.moq) {
      this.belowMinQty = true;
      this.priceValid = false;
    } else if (qty == 0) {
      this.priceValid = false;
      // Do Nothing as of now
    }
    // .subscribe(Response => {
    //   const priceValue = Response as any;
    //   this.price = priceValue.price;
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


  order(f) {
    this.orderService.get('orderno')        // Sending url as per API defination
      .subscribe(response => {              // improve coding standards
        const res = response as any;
        this.lastorderno = parseInt(res[0].orderno) + 1;

    const OrderData = {
      // orderno: (this.userid.substring(-1,5)  + this.gblisting.item.seller._id.substring(-1,5)).toUpperCase(),    // Frame a order no generator here
      orderno: String(this.lastorderno),
      quantity: f.quantity,
      unit: this.gblisting.unit.mass,
      // unitId: this.gblisting.unit._id,
      cost: (f.quantity * this.gblisting.dealprice).toFixed(2),
      price: this.gblisting.dealprice,
      itemId: this.gblisting.item._id,
      // addressId: this.address._id,
      buyerId: this.userid,
      sellerId: this.gblisting.item.seller._id,
      placedTime: Date.now().toString(),
      referenceGBId: this.gblisting._id,
      status: 'new',
      ordertype: 'groupbuying',
      isshippingbillingdiff : false
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
}
