import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {GBListingService} from '../services/gblisting.service';
import { GBListing } from '../model/gblisting';
import { UserService } from '../services/user.service';
import { OrderService } from '../services/order.service';
import { PriceService } from '../services/price.service';
import { AppError } from '../common/app-error';

@Component({
  selector: 'app-gborder-now',
  templateUrl: './gborder-now.component.html',
  styleUrls: ['./gborder-now.component.scss']
})
export class GBOrderNowComponent implements OnInit {

  gblisting: GBListing;
  address: any;
  userid: any;
  price = 0;
  priceValid = false;
  constructor(private gblistingService: GBListingService, private userService: UserService,
    private route: ActivatedRoute, private router: Router, private orderService: OrderService,
    private priceService: PriceService) { }

  ngOnInit() {
    this.route.paramMap
    .subscribe(params => {
      const id = params.get('id');
      this.getProduct(id);
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
      this.gblisting = response as GBListing;
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });
  }

  onQuantityChange(qty) {
    const PriceData = {
      qty: qty,
      itemId: this.gblisting.item._id,
      buyerId: this.userid,
      sellerId: this.gblisting.item.seller._id
    };
    this.priceValid = false;
    this.priceService.getPrice(PriceData)
    .subscribe(Response => {
      const priceValue = Response as any;
      this.price = priceValue.price;
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

  generateorderno(odrno){           // To generate order id

  }

  order(f) {
    const OrderData = {
      orderno: (this.userid.substring(-1,5)  + this.gblisting.item.seller._id.substring(-1,5)).toUpperCase(),    // Frame a order no generator here
      quantity: f.quantity,
      cost: f.quantity * this.gblisting.dealprice,
      itemId: this.gblisting.item._id,
      addressId: this.address._id,
      buyerId: this.userid,
      sellerId: this.gblisting.item.seller._id,
      placedTime: Date.now().toString(),
      status: 'new',
      ordertype: 'groupbuying'
    };

    this.orderService.create(OrderData)
    .subscribe(response => {
      console.log(response);
      alert('Order Placed Successfully');
      this.router.navigate(['/myOrders']);
    }, (error: AppError) => {
      console.log(error);
      this.router.navigate(['/errorpage']);
    });
  }
}
