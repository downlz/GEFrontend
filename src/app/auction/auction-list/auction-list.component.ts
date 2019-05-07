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
  loading: boolean;
  activeTab: string = 'active';
  activeAuctions: any;
  inActiveAuctions: any;
  pendingAuctions: any;

  constructor(private service: AuctionService, private auth: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.role = this.auth.getRole();
    let subscription = null;
    if (this.role === 'admin') {
      subscription = this.service.getAll();
    } else if (this.role === 'seller') {
      subscription = this.service.getCurrentUserData();
    } else {
      //To be changed for buyer
      subscription = this.service.getAll();
    }
    this.loading = true;
    subscription
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
      return auction.approved && (new Date().getTime() <= (new Date(auction.endTime)).getTime());
    });
    this.inActiveAuctions = this.auctions.filter((auction) => {
      return (new Date()).getTime() > (new Date(auction.endTime)).getTime();
    });
    this.pendingAuctions = this.auctions.filter((auction) => {
      return !auction.approved;
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
    if (this.role === 'seller' || this.role === 'admin') {
      return ['bids', 'details'];
    } else {
      return ['bid', 'details'];
    }
  }


}
