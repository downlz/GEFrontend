import {Component, OnInit} from '@angular/core';
import {AuctionService} from '../../services/auction.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auction-status',
  templateUrl: './auction-status.component.html',
  styleUrls: ['./auction-status.component.scss']
})
export class AuctionStatusComponent implements OnInit {
  auctions: any;
  role: string;
  loading: boolean;

  constructor(private service: AuctionService, private auth: AuthService, private router: Router) {

  }


  ngOnInit() {
    this.role = this.auth.getRole();
    let subscription = null;
    if (this.role === 'admin') {
      subscription = this.service.getAll();
    } else if (this.role === 'seller') {
      subscription = this.service.getCurrentUserAuctions();
    }
    this.loading = true;
    subscription
      .subscribe(response => {
        this.auctions = response;
        this.loading = false;
      }, () => {
        this.loading = false;
      });
  }

}
