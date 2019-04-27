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

  }

  /**
   * Get User Role
   */
  get role() {
    return this.auth.getRole();
  }

  ngOnInit() {
  }

}
