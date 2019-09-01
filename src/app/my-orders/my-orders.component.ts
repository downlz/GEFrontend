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

  pageSize = 6;
  currentPage = 1;
  data: Array<any>;
  totalPages: Array<Number> = [];
  loading: Boolean = true;
  username: String;

  constructor(private authenticationService: AuthService, private myorderService: MyorderService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const currentUser = this.authenticationService.currentUserValue;
    this.username = currentUser.name;
    this.myorderService.get(currentUser._id)
    .subscribe(response => {
      this.orders = response as any;
      this.setTotalPages();
      this.onPageChange(this.currentPage);
      this.loading = false;
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });  
  }

  onPageChange(page) {
    this.data = [...(this.orders || [])];
    this.data = this.data.splice((page - 1) * this.pageSize, this.pageSize);
    this.currentPage = page;
  }

  setTotalPages() {
    const length = (this.orders || []).length;
    // console.log(this.listings)
    if (length > 0) {
      const pages = (length % this.pageSize) === 0 ? (length / this.pageSize) : Math.floor(length / this.pageSize) + 1;
      this.totalPages = Array(pages).fill(0).map((x, i) => i + 1);
    }
  }

}
