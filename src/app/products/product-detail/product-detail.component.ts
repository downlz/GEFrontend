import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ListingService} from '../../services/listing.service';
import { Listing } from '../../model/listing';
import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';
import {AuthService} from '../../services/auth.service';
import { AppError } from '../../common/app-error';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  listing: Listing;
  address: any;
  userid: any;
  role: string;
  paymentdt : string;
  liftdt: string;
  payliftStr: string;
  currDate: string;

  lastorderno: number;
  constructor(private listingService: ListingService, private userService: UserService,
    private auth: AuthService,public datepipe: DatePipe,
    private route: ActivatedRoute, private router: Router, private orderService: OrderService) { }

  ngOnInit() {
    const role = this.auth.getRole();
    this.role = role;
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
  this.listingService.get(id)
    .subscribe(response => {
      this.listing = response as Listing;
      this.paymentdt = this.datepipe.transform(this.listing.paymentdate ? this.listing.paymentdate : new Date(), 'dd-MMM-yy');
      this.liftdt = this.datepipe.transform(this.listing.liftdate ? this.listing.liftdate : new Date(), 'dd-MMM-yy');
      this.currDate = this.datepipe.transform(new Date(), 'dd-MMM-yy');

      if (this.paymentdt < this.currDate ){
        this.paymentdt = this.currDate
      } else if (this.liftdt < this.currDate ){
        this.liftdt = this.currDate
      } else {
        // Do nothing as of now
      }
      if (this.paymentdt == this.liftdt){
        this.payliftStr = 'Pay and Lift by ' + this.paymentdt;
      } else {
        this.payliftStr = 'Pay by ' + this.paymentdt + ' & ' + 'Lift by ' + this.liftdt; 
      }
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });
  }

  order() {

    // this.orderService.get('orderno')        // Sending url as per API defination
    //   .subscribe(response => {              // improve coding standards
    //     const res = response as any;
    //     this.lastorderno = parseInt(res[0].orderno) + 1;

    const OrderData = {
      // orderno: String(this.lastorderno),
      quantity: 0,
      cost: 0,
      itemId: this.listing._id,
      unit: this.listing.unit.mass,
      // addressId: this.address._id,
      buyerId: this.userid,
      sellerId: this.listing.seller._id,
      placedTime: Date.now().toString(),
      ordertype: 'sampleorder',
      status: 'new',
      isshippingbillingdiff: false
    };
    // console.log(OrderData);
    this.orderService.create(OrderData)
    .subscribe(response => {
      // console.log(response);
      alert('Sample Order Placed Successfully');
      this.router.navigate(['/products']);
    }, (error: AppError) => {
      console.log(error);
      this.router.navigate(['/errorpage']);
    });
  // })
}
}
