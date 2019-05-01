import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppError } from '../common/app-error';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {
  orders: any;
  states = ['new', 'confirmed', 'ready','shipped', 'delivered','cancelled'];
  constructor(private authenticationService: AuthService, private orderService: OrderService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.orderService.getAll()
    .subscribe(response => {
      this.orders = response as any;
      // console.log(this.orders);
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });
  }

  updateOrder(order) {
    console.log(order);
    const updateData = {
      _id: order._id,
      status:  order.status
    };

    this.orderService.update(updateData)
    .subscribe(response => {
      console.log(response);
      alert('Update successful');
    }, (error: AppError) => {
      console.log(error);
        this.router.navigate(['/errorpage']);
      console.log(error.originalError.status);
    });
  }

}
