import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ListingService} from '../services/listing.service';
import { Listing } from './../model/listing';
import { UserService } from '../services/user.service';
import { OrderService } from '../services/order.service';
import { AppError } from '../common/app-error';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  listing: Listing;
  address: any;
  userid: any;
  constructor(private listingService: ListingService, private userService: UserService,
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

  order() {
    const OrderData = {
      quantity: 0,
      cost: 0,
      itemId: this.listing._id,
      unit: this.listing.unit.mass,
      addressId: this.address._id,
      buyerId: this.userid,
      sellerId: this.listing.seller._id,
      placedTime: Date.now().toString(),
      ordertype: 'sampleorder',
      status: 'new'
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
