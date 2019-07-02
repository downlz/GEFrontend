import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingService } from '../services/listing.service';
import { Listing } from '../model/listing';
import { UserService } from '../services/user.service';
import { StateService } from '../services/state.service';
import { OrderService } from '../services/order.service';
import { BargainService } from '../services/bargain.service';
import { AddressService } from '../services/address.service';
import { PriceService } from '../services/price.service';
import { AppError } from '../common/app-error';
import { forkJoin } from 'rxjs';
// import { NgForm } from '@angular/forms';

// declare var conversationalForm: any;

@Component({
  selector: 'app-bargain-order',
  templateUrl: './bargain-order.component.html',
  styleUrls: ['./bargain-order.component.scss']
})
export class BargainOrderComponent implements OnInit {

  listing: Listing;
  address: any;
  userid: any;
  user: any;
  itemid: any;
  statedata: any;
  addresses: any;
  state: any = []; //Array<any> = [];
  hideblock: false;
  price = 0;
  priceValid = false;
  showShippingDetails: Boolean = false;
  lastorderno: number;
  image: String;
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
        this.bargainService.getBuyerBargain(this.userid,this.itemid)
        .subscribe(response => {
          if (!response[0]) {
            this.activeBargain = false;
          } else {
            this.activeBargain = true;
          }
          console.log(response);
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
      console.log(this.listing);
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });
  }

  createBargain(){
    // this.orderService.get('orderno')        // Sending url as per API defination
    //   .subscribe(response => {              // improve coding standards
    //     const res = response as any;
    //     this.lastorderno = parseInt(res[0].orderno) + 1;
    //     // console.log(this.lastorderno);
    //   // })
    // const shippingAddress = {
    //   partyname: f.partyname,
    //   gstin: f.partygstin,
    //   address : {
    //     text: f.address,
    //     pincode: f.pincode,
    //     state: f.statedat,
    //     phone: f.phone,
    //     addresstype: 'delivery'
    //   }
    // }    

    const BargainData = {
      itemId: this.listing._id,
      buyerId : this.userid,
      buyerquote : '56'
      // addressreference: f.shipaddr
    };
    // console.log(OrderData);

    this.bargainService.create(BargainData)
    .subscribe(response => {
      alert('Order Placed Successfully');
      this.router.navigate(['/myOrders']);
    }, (error: AppError) => {
      console.log(error);
      this.router.navigate(['/errorpage']);
    });
  }
}