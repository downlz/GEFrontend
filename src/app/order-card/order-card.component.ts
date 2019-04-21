import { Component, OnInit, Input } from '@angular/core';
import {ListingService} from '../services/listing.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
  @Input('order') order: any;
  constructor(private listingService: ListingService) { }

  ngOnInit() {
    console.log(this.order);
  }

  getOrderStatusNumber() {
    if (this.order.status === 'new') {
      return 1;
    }
    if (this.order.status === 'confirmed') {
      return 2;
    }
    if (this.order.status === 'shipped') {
      return 3;
    }
    if (this.order.status === 'delivered') {
      return 4;
    }
    if (this.order.status === 'cancelled') {
      return 5;
    }
  }
  // setNewClasses() {
  //   const classes = {
  //     progtrckr-done: (this.getOrderStatusNumber() < 2),
  //     progtrckr-todo: (this.getOrderStatusNumber() >= 2)
  //   };
  //   return classes;
  // }
}
