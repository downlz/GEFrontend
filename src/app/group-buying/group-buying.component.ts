import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { GroupBuyingService } from '../services/groupbuying.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppError } from '../common/app-error';

@Component({
  selector: 'app-group-buying',
  templateUrl: './group-buying.component.html',
  styleUrls: ['./group-buying.component.scss']
})
export class GroupBuyingComponent implements OnInit {
  orders: any;
  states = ['new', 'confirmed','ready', 'shipped', 'delivered'];
  constructor(private authenticationService: AuthService, private groupBuying: GroupBuyingService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // console.log("Here")
    // this.groupBuying.getAll()
    // .subscribe(response => {
    //   this.orders = response as any;
    //   console.log(this.orders);
    // }, (error: Response) => {
    //   this.router.navigate(['/errorpage']);
    //   if (error.status === 400) {
    //     alert(' expected error, post already deleted');
    //   }
    //   console.log(error);
    // });
  }

  updateOrder(order) {
    console.log(order);
    const updateData = {
      _id: order._id,
      status:  order.status
    };

    // this.groupBuying.update(updateData)
    // .subscribe(response => {
    //   console.log(response);
    //   alert('Update successful');
    // }, (error: AppError) => {
    //   console.log(error);
    //     this.router.navigate(['/errorpage']);
    //   console.log(error.originalError.status);
    // });
  }

}
