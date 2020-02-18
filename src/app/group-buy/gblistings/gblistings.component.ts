import { Component, OnInit } from '@angular/core';
import {GBListingService} from './../../services/gblisting.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-gblistings',
  templateUrl: './gblistings.component.html',
  styleUrls: ['./gblistings.component.scss']
})

export class GBListingsComponent implements OnInit {
  gblistings: any;
  pageSize = 6;
  currentPage = 1;
  data: Array<any>;
  totalPages: Array<Number> = [];
  loading : boolean;
  role: string;

  constructor(private service: GBListingService, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.service.getAll()
    // console.log(response);
    .subscribe(response => {
      this.gblistings = response;
      this.loading = false;
      this.setTotalPages();
      this.onPageChange(this.currentPage);
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });
  }

  onPageChange(page) {
    this.data = [...(this.gblistings || [])];
    this.data = this.data.splice((page - 1) * this.pageSize, this.pageSize);
    this.currentPage = page;
  }

  setTotalPages() {
    const length = (this.gblistings || []).length;
    // console.log(length);
    // console.log(this.gblistings)
    if (length > 0) {
      const pages = (length % this.pageSize) === 0 ? (length / this.pageSize) : Math.floor(length / this.pageSize) + 1;
      this.totalPages = Array(pages).fill(0).map((x, i) => i + 1);
    }
  }

}
