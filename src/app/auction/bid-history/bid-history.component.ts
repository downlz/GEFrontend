import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bid-history',
  templateUrl: './bid-history.component.html',
  styleUrls: ['./bid-history.component.scss']
})
export class BidHistoryComponent implements OnInit {
  @Input()
  modal: any;
  @Input()
  bids: Array<any>;
  @Input()
  bid: any;
  @Input()
  auctionType : string;

  constructor() {
  }

  ngOnInit() {
  }

  getDateString(str) {
    return new Date(str).toLocaleString();
  }

}
