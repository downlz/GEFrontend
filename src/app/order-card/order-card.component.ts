import { Component, OnInit, Input } from '@angular/core';
import {ListingService} from '../services/listing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
  @Input('order') order: any;
  apiurl: string;
  shippingAddr: object;
  shippingaddress: any;
  constructor(private listingService: ListingService) { }

  ngOnInit() {
    // console.log(this.order);
    this.apiurl = environment.baseUrl;
    // this.retrieveShippingDtls();
  }

  getOrderStatusNumber() {
    if (this.order.status === 'new') {
      return 1;
    }
    if (this.order.status === 'confirmed') {
      return 2;
    }
    if (this.order.status === 'ready') {
      return 3;
    }
    if (this.order.status === 'shipped') {
      return 4;
    }
    if (this.order.status === 'delivered') {
      return 5;
    }
    if (this.order.status === 'cancelled') {
      return 6;
    }
  }

  retrieveShippingDtls() {
    // Shipadd diff true - > pick details from shipping field
    // Shipdd diff false - > pick details for buyer full
    // Shippadd diff null - > pick address from address field and buyer name from buyer profile
    if (this.order.isshippingbillingdiff == true) {
      this.shippingaddress = this.order.shippingaddress
      const shippingAddr = {
          party : this.shippingaddress.addressbasicdtl.partyname,
          gstin : this.shippingaddress.addressbasicdtl.gstin,
          addresstext : this.shippingaddress.text,
          state : this.shippingaddress.state.name,
          pincode : this.shippingaddress.pin,
          phone : this.shippingaddress.phone
      }
      // console.log(shippingAddr);
      // return shippingAddr;
    } else if (this.order.isshippingbillingdiff == false) {
      // console.log("I am here");
      const shippingAddr = {
        party : this.order.buyer.name,
        gstin : this.order.buyer.GST,
        addresstext : this.order.buyer.Addresses[0].text,
        city : this.order.buyer.Addresses[0].city.name,
        state : this.order.buyer.Addresses[0].city.state.name,
        pincode : this.order.buyer.Addresses[0].pin,
        phone : this.order.buyer.phone
    }
      // console.log(shippingAddr);
      // console.log(this.order);
    } else {
      // console.log("I am here");
      const shippingAddr = {
        party : this.order.buyer.name,
        gstin : this.order.buyer.GST,
        addresstext : this.order.address.text,
        // city : this.order.buyer.Addresses[0].city.name,
        state : this.order.address.state.name,
        pincode : this.order.address.pin,
        phone : this.order.buyer.phone
    }
    // console.log(shippingAddr);
    }
    return this.shippingAddr;
  }
  // setNewClasses() {
  //   const classes = {
  //     progtrckr-done: (this.getOrderStatusNumber() < 2),
  //     progtrckr-todo: (this.getOrderStatusNumber() >= 2)
  //   };
  //   return classes;
  // }

}
