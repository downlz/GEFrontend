import {Component, Input, OnInit} from '@angular/core';
import {Listing} from '../../model/listing';

@Component({
  selector: 'app-auction-listing-card',
  templateUrl: './auction-listing-card.component.html',
  styleUrls: ['./auction-listing-card.component.scss']
})
export class AuctionListingCardComponent implements OnInit {
  @Input('listing') listing: Listing;
  constructor() { }

  ngOnInit() {
  }


}
