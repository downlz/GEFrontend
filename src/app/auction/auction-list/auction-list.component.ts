import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuctionService} from '../../services/auction.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.scss']
})
export class AuctionListComponent implements OnInit {
  auctions: any;
  role: string;
  loading: boolean = true;
  activeTab: string = 'active';
  activeAuctions: any;
  inActiveAuctions: any;
  myAuctions: any;
  pendingAuctions: any;

  constructor(private service: AuctionService, private auth: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.role = this.auth.getRole();
    let subscription = null;
    subscription = this.service.getAll()
      .subscribe(response => {
        this.auctions = response;
        this.setAuctions();
        this.loading = false;
      }, () => {
        alert('Error while fetching data');
        this.loading = false;
      });
  }

  setAuctions() {
    this.activeAuctions = this.auctions.filter((auction) => {
      if (this.role === 'seller') {
        return auction.approved && auction.auctionType === 'buyer' && (new Date().getTime() <= (new Date(auction.endTime)).getTime());
      } else if (this.role === 'buyer') {
        return auction.approved && auction.auctionType === 'seller' && (new Date().getTime() <= (new Date(auction.endTime)).getTime());
      } else {
        return auction.approved && (new Date().getTime() <= (new Date(auction.endTime)).getTime());
      }
    });
    this.inActiveAuctions = this.auctions.filter((auction) => {
      const difference = (new Date()).getTime() - (new Date(auction.endTime)).getTime();
      return (auction.user._id === this.auth.getId() || this.role === 'admin' || this.role === 'agent') && difference > 0 && difference < (1000 * 60 * 60 * 24 * 7);
    });
    this.pendingAuctions = this.auctions.filter((auction) => {
      return (auction.user._id === this.auth.getId() || this.role === 'admin' || this.role === 'agent') && !auction.approved;
    });
    this.myAuctions = this.auctions.filter((auction) => {
      return auction.approved && (auction.user._id === this.auth.getId()) && (new Date().getTime() <= (new Date(auction.endTime)).getTime());
    });
  }


  changeTab(tab) {
    this.activeTab = tab;
  }

  onDataChange($event) {
    const modifiedAuctions = [].concat(this.auctions);
    for (let i = 0; i < modifiedAuctions.length; i++) {
      if (modifiedAuctions[i]._id === $event._id) {
        modifiedAuctions[i] = $event;
        break;
      }
    }
    this.auctions = modifiedAuctions;
    this.setAuctions();
  }

  getActiveAuctionActions() {
    if (this.role === 'admin') {
      return ['bids', 'details'];
    } else {
      return ['bid', 'details'];
    }
  }


}
