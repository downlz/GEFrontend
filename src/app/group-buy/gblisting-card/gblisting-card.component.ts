import { Component, OnInit, Input } from '@angular/core';
import { GBListing } from './../../model/gblisting';

@Component({
  selector: 'app-gblisting-card',
  templateUrl: './gblisting-card.component.html',
  styleUrls: ['./gblisting-card.component.scss']
})
export class GBListingCardComponent implements OnInit {
  @Input('gblisting') gblisting: GBListing;
  constructor() { }

  ngOnInit() {
  }

}
