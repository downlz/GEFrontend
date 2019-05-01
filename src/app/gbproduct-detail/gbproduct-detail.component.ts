import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {GBListingService} from '../services/gblisting.service';
import { GBListing } from '../model/gblisting';
import { UserService } from '../services/user.service';
import { OrderService } from '../services/order.service';
import { AppError } from '../common/app-error';

@Component({
  selector: 'app-gbproduct-detail',
  templateUrl: './gbproduct-detail.component.html',
  styleUrls: ['./gbproduct-detail.component.scss']
})
export class GBProductDetailComponent implements OnInit {
 gblisting: GBListing;
  address: any;
  userid: any;
  constructor(private gblistingService: GBListingService, private userService: UserService,
    private route: ActivatedRoute, private router: Router, private orderService: OrderService) { }

  ngOnInit() {
    this.route.paramMap
    .subscribe(params => {
      const id = params.get('id');
      this.getProduct(id);
    });
    this.userService.get('me')
    .subscribe(response => {
      const res = response as any;
      // console.log(res);
      // console.log('Here1');
      this.address = res.Addresses[0];
      // console.log(res._id);          
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
    // console.log("Helo");
  this.gblistingService.get(id)
    .subscribe(response => {
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

  order() {
    const OrderData = {
      quantity: 0,
      cost: 0,
      itemId: this.gblisting.item._id,
      addressId: this.address._id,
      buyerId: this.userid,
      sellerId: this.gblisting.item.seller._id,
      placedTime: Date.now().toString(),
      status: 'new',
      ordertype: 'groupbuying'
    };
    console.log(OrderData);
    this.orderService.create(OrderData)
    .subscribe(response => {
      console.log(response);
      alert('Order Placed Successfully');
      this.router.navigate(['/products']);
    }, (error: AppError) => {
      console.log(error);
      this.router.navigate(['/errorpage']);
    });
  }
}
