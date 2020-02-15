import { Component, OnInit, Input } from '@angular/core';
import { Listing } from '../model/listing';

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.scss']
})
export class ListingCardComponent implements OnInit {
  @Input('listing') listing: Listing;
  constructor() { }

  ngOnInit() {
  }

}
