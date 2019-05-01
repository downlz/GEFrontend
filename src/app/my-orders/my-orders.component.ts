import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MyorderService } from '../services/myorder.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  orders: any;
  constructor(private authenticationService: AuthService, private myorderService: MyorderService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const currentUser = this.authenticationService.currentUserValue;
    this.myorderService.get(currentUser._id)
    .subscribe(response => {
      this.orders = response as any;
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });
  }

}
