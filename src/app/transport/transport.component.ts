import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-auction',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})
export class TransportComponent implements OnInit {
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
