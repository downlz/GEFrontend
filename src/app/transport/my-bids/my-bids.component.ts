import {Component, OnInit} from '@angular/core';
import {BidService} from '../../services/bid.service';

@Component({
  selector: 'app-my-bids',
  templateUrl: './my-bids.component.html',
  styleUrls: ['./my-bids.component.scss']
})
export class MyBidsComponent implements OnInit {

  bids: Array<any>;
  loading: Boolean = true;

  constructor(private bidService: BidService) {
    bidService.getCurrentUserData().subscribe((data: Array<any>) => {
      this.bids = data;
      this.loading = false;
    }, (err) => {
      console.error(err);
      this.loading = false;
    });
  }

  ngOnInit() {
  }

}
