import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingService } from '../services/listing.service';
import { Listing } from './../model/listing';
import { UserService } from '../services/user.service';
import { StateService } from '../services/state.service';
import { OrderService } from '../services/order.service';
import { PriceService } from '../services/price.service';
import { AppError } from '../common/app-error';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-order-now',
  templateUrl: './order-now.component.html',
  styleUrls: ['./order-now.component.scss']
})
export class OrderNowComponent implements OnInit {

  listing: Listing;
  address: any;
  userid: any;
  state: any;
  hideblock: false;
  price = 0;
  priceValid = false;
  lastorderno: number;
  constructor(private listingService: ListingService, private userService: UserService,
    private route: ActivatedRoute, private router: Router, private stateService: StateService,
    private orderService: OrderService, private priceService: PriceService) { }

  ngOnInit() {
    this.route.paramMap
    .subscribe(params => {
      const id = params.get('id');
      this.getProduct(id);
    });
    this.stateService.getAll()
    .subscribe(response => {
      const res = response as any;
      this.state = res.name;
      // console.log(this.state);
    }) 
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

  // isShipAddressSame(val){
  //     if (val = 'Yes') {
  //       this.hideblock = true;
  //     } else {
  //       this.hideblock = false;
  //     }
  // }

  onQuantityChange(qty) {
    const PriceData = {
      qty: qty,
      itemId: this.listing._id,
      buyerId: this.userid,
      sellerId: this.listing.seller._id
    };
    this.priceValid = false;
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

    this.orderService.get('orderno')        // Sending url as per API defination
      .subscribe(response => {              // improve coding standards
        const res = response as any;
        this.lastorderno = parseInt(res[0].orderno) + 1;
        // console.log(this.lastorderno);
      // })
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
      status: 'new'
    };
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