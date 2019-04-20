import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss']
})
export class AuctionComponent implements OnInit {
  private currentUser: any;

  constructor(private auth: AuthService) {
    this.auth.currentUser.subscribe(x => this.currentUser = x);
  }

  /**
   * Get User Role
   */
  get role() {
    if (this.currentUser) {
      if (this.currentUser.isAdmin) {
        return 'admin';
      } else if (this.currentUser.isSeller) {
        return 'seller';
      } else {
        return 'buyer';
      }
    }
    return null;
  }

  ngOnInit() {
  }

}
