import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.component.html',
  styleUrls: ['./listing-detail.component.scss']
})
export class ListingDetailComponent implements OnInit {
  @Input()
  listing: any;

  constructor() {
  }

  ngOnInit() {
  }

}
