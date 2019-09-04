import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-products-data',
  templateUrl: './products-data.component.html',
  styleUrls: ['./products-data.component.scss']
})
export class ProductDataComponent implements OnInit {
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
