import { Component, OnInit } from '@angular/core';
// import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Router } from '@angular/router';
// import { ListingService } from '../services/listing.service';
import { Listing } from '../model/listing';
import { UserService } from '../services/user.service';
// import { StateService } from '../services/state.service';
import { AuthService } from '../services/auth.service';
import { BargainService } from '../services/bargain.service';
import { AddressService } from '../services/address.service';
// import { PriceService } from '../services/price.service';
import { AppError } from '../common/app-error';
// import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-bargain-quote',
  templateUrl: './bargain-quote.component.html',
  styleUrls: ['./bargain-quote.component.scss']
})

export class BargainQuoteComponent implements OnInit {

  role: String;
  listing: Listing;
  address: any;
  userid: any;
  user: any;
  lapsetime: any;
  itemid: any;
  statedata: any;
  addresses: any;
  state: any = []; 
  hideblock: false;
  image: String;
  bargain: any;
  action: String;
  // activeBargain: Boolean = false;
  newrequest: Boolean = false;
  quoteSellerType: String = 'Seller';
  quoteBuyerType: String = 'Buyer';
  userTurn: String;
  activeBargain: Boolean = false;
  userquote: String;
  quoteObj: any;
  expirydate: any;
  loading : Boolean = true;
  
  constructor(private userService: UserService,
    private route: ActivatedRoute, private router: Router,
    private authenticationService: AuthService,
    private addressService: AddressService,
    private bargainService: BargainService) { }

  ngOnInit() {
     
    const role = this.authenticationService.getRole();
    this.role = role;

    if (this.role === 'buyer') {
        this.quoteBuyerType = 'Your';
        this.quoteSellerType = 'Seller';
    } else if (this.role === 'seller') {
      this.quoteBuyerType = 'Buyer';
      this.quoteSellerType = 'Your';
  } else {
    // Do nothing 
  }
    this.route.paramMap
    .subscribe(params => {
      const id = params.get('id');
      this.itemid = id;
      this.getBargainDtl(id);
      
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });
};

  getUserDtl() {
    this.userService.get('me')
      .subscribe(response => {
        const res = response as any;
        this.user = res;
        this.address = res.Addresses[0];
        this.userid = res._id;
        this.addressService.getUserAddr(res._id, res.phone)
          .subscribe(response => {
            this.addresses = response;
            this.checkActiveBargain();
          }, (error: Response) => {
            this.router.navigate(['/errorpage']);
            if (error.status === 400) {
              alert(' expected error, post already deleted');
            }
            console.log(error);
          });
      });
      
  }

  getBargainDtl(id) {
    this.bargainService.getBargainLapseTime(id)
    .subscribe(response => {
      this.lapsetime = response as any;
      this.expirydate = this.lapsetime.bargainlapse;
    });

    this.bargainService.get(id)
    .subscribe(response => {
      this.bargain = response as any;
      // this.expirydate = new Date(new Date(this.bargain.firstquote.requestedon).getTime() + (1000 * 60 * 60 * 24));
      this.getNextUserTurn(this.bargain);
      // this.checkActiveBargain();
      // return('done');
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
      // return('broke');
    });
  }

  counterBargain(){
    if (this.userquote) {
    if (this.userTurn === 'seller') {
       this.quoteObj =  {
        sellerquote : this.userquote,
        action : 'countered'
      }
    } else {
      this.quoteObj =  {
        buyerquote : this.userquote,
        action : 'countered'
      }
    };
    this.bargainService.updateQuote(this.itemid, this.quoteObj)
    .subscribe(Response => {
      const quoteComplete  = Response as any;
      alert('Request made successfully');
      this.router.navigate(['/bargainRequest']);
    }, (error: AppError) => {
      console.log(error);
      this.router.navigate(['/errorpage']);
    });
  } else {
    alert("Please enter a valid price to proceed or this action cannot be completed");
    }
  };

  pauseBargain(quotes){
    console.log(quotes);
  };

  // -1 -> rejected quote, 1 -> accepted quote, 0 is not accepted in req body
  acceptBargain() {
    if (this.userTurn === 'seller') {
      this.quoteObj =  {
       sellerquote : 1,
       action : 'accepted'
     }
   } else {
     this.quoteObj =  {
       buyerquote : 1,
       action : 'accepted'
     }
   };
   if (this.userTurn === this.role) {
    this.bargainService.updateQuote(this.itemid, this.quoteObj)
    .subscribe(Response => {
      const quoteComplete  = Response as any;
      alert('Bargain request accepted successfully');
      this.router.navigate(['/bargainRequest']);
    }, (error: AppError) => {
      console.log(error);
      this.router.navigate(['/errorpage']);
    }); 
  } else {
    alert("You cannot accept a most recent quote made by you.Wait for seller response.")
  }
  };

  rejectBargain() {
    if (confirm("Are you sure to reject this bargain request?")) {
      if (this.userTurn === 'seller') {
        this.quoteObj =  {
         sellerquote : -1,
         action : 'rejected'
       }
     } else {
       this.quoteObj =  {
         buyerquote : -1,
         action : 'rejected'
       }
     };
    this.bargainService.updateQuote(this.itemid, this.quoteObj)
    .subscribe(Response => {
      const quoteComplete  = Response as any;
      console.log(quoteComplete);
      alert('The bargain request was rejected sucessfully');
      this.router.navigate(['/bargainRequest']);
    }, (error: AppError) => {
      console.log(error);
      this.router.navigate(['/errorpage']);
    }); 
    }
  };

  bargainAction() {
    if (confirm("Are you sure to reject this bargain request?")) {
    console.log('test');
    }
    };

  getNextUserTurn(bargaindtl) {
    if (bargaindtl.firstquote.sellerquote === null) {
      this.userTurn = 'seller';
    } else if (bargaindtl.bargaincounter === 2 && !bargaindtl.secondquote) {
      this.userTurn = 'buyer';
    } else if (bargaindtl.bargaincounter === 2 && bargaindtl.secondquote) {
      this.userTurn = 'seller';
    } else if (bargaindtl.bargaincounter === 3 && !bargaindtl.thirdquote) {
      this.userTurn = 'buyer';
    } else if (bargaindtl.bargaincounter === 3 && bargaindtl.thirdquote && bargaindtl.bargainstatus !== 'lastbestprice') {
      this.userTurn = 'seller';
    } else {
      this.userTurn = 'buyer';
    }
    // this.checkActiveBargain();
    this.getUserDtl();
  }

  checkActiveBargain() {
    // console.log(this.role);
    // console.log(this.userid);
    if (this.role === 'buyer') {
      this.bargainService.getBuyerBargain(this.userid, this.bargain.item._id)
      .subscribe(response => {
        if (!response[0]) {
          this.activeBargain = false;
        } else {
          this.activeBargain = true;
        }
      });
      // console.log(this.acceptBargain);
    } else {
      this.bargainService.getSellerBargain(this.userid, this.bargain.item._id)
      .subscribe(response => {
        if (!response[0]) {
          this.activeBargain = false;
        } else {
          this.activeBargain = true;
        }
      })
    }
    this.loading = false;
    // , (error: Response) => {
    //   this.router.navigate(['/errorpage']);
    //   if (error.status === 400) {
    //     alert(' expected error, post already deleted');
    //   }
    //   console.log(error);
    // });
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