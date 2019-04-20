import { Component, OnInit, Input } from '@angular/core';
import {GBListingService} from '../services/gblisting.service';

@Component({
  selector: 'app-gborder-card',
  templateUrl: './gborder-card.component.html',
  styleUrls: ['./gborder-card.component.scss']
})
export class GBOrderCardComponent implements OnInit {
  @Input('order') order: any;
  constructor(private gblistingService: GBListingService) { }

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
  }
  // setNewClasses() {
  //   const classes = {
  //     progtrckr-done: (this.getOrderStatusNumber() < 2),
  //     progtrckr-todo: (this.getOrderStatusNumber() >= 2)
  //   };
  //   return classes;
  // }
}
