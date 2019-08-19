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
  pageSize = 15;
  currentPage = 1;
  totalPages: Array<Number> = [];
  data: Array<any>;
  loading: Boolean = true;
  states = ['new', 'confirmed','ready', 'shipped', 'delivered'];
  constructor(private authenticationService: AuthService, private groupBuying: GroupBuyingService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // console.log("Here");
    this.groupBuying.getAll()
    .subscribe(response => {
      this.orders = response as any;
      this.setTotalPages();
      this.onPageChange(this.currentPage);
      this.loading = false;
      console.log(this.orders);
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
