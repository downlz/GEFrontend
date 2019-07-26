import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingService } from '../services/listing.service';
import { Listing } from '../model/listing';
import { UserService } from '../services/user.service';
// import { StateService } from '../services/state.service';
import { AuthService } from '../services/auth.service';
import { BargainService } from '../services/bargain.service';
import { AddressService } from '../services/address.service';
// import { PriceService } from '../services/price.service';
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

  role: String;

  listing: Listing;
  address: any;
  userid: any;
  user: any;
  itemid: any;
  statedata: any;
  addresses: any;
  state: any = []; //Array<any> = [];
  hideblock: false;
  image: String;
  bargain: any;
  newrequest: Boolean = false;
  activeBargain: Boolean = false;
  
  constructor(private listingService: ListingService, private userService: UserService,
    private route: ActivatedRoute, private router: Router, 
    private modalService: NgbModal, private authenticationService: AuthService,
    private addressService: AddressService, 
    private bargainService: BargainService) { }

  ngOnInit() {
    const role = this.authenticationService.getRole();
    this.role = role;

    this.route.paramMap
    .subscribe(params => {
      const id = params.get('id');
      this.itemid = id;
      this.getProduct(this.itemid);
    });
    // this.stateService.getAll()
    // .subscribe(response => {
    //   this.state = response;
    // });
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
          this.bargain = response as any;
          if (!response[0]) {
            this.activeBargain = false;
          } else {
            this.activeBargain = true;
            this.bargain = response[0];
          }
          // console.log(response);
        });
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });
    // this.checkActiveBargain();
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
    this.bargainService.getBuyerBargain(this.userid,this.itemid)
    .subscribe(response => {
      this.bargain = response as any;
      console.log(this.bargain);
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });
  }

  createBargain(f) { 
    const BargainData = {
      itemId: this.listing._id,
      buyerId : this.userid,
      quantity : f.quantity,
      buyerquote : f.firstquote
    };
    this.bargainService.create(BargainData)
    .subscribe(response => {
      alert('Bargain request raised to seller');
      this.router.navigate(['/products']);
    }, (error: AppError) => {
      console.log(error);
      this.router.navigate(['/errorpage']);
    });
  }

}