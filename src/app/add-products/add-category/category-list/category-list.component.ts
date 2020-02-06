import { CategoryService } from './../../../services/category.service';

import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
// import { ListingService } from '../../../services/listing.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  unit: any;
  pageSize = 15;
  currentPage = 1;
  data: Array<any>;
  totalPages: Array<Number> = [];
  role: string;
  manufacturers: any = [];
  loading : boolean = true;
  categories: any;
  queryParams = '';

  constructor(private auth: AuthService,
    // private listingService: ListingService,
    private categoryService: CategoryService,
    // private modalService: NgbModal, private toastr: ToastrService,
    private router: Router) {
    this.role = auth.getRole();
    // this.userId = auth.getId();
    // this.manufacturerService.getAll().subscribe((resp) => {
    //   this.manufacturers = resp;
    // });
  }

  ngOnInit() {
    const currentUser = this.auth.currentUserValue;
    
    this.categoryService.getAll()
    .subscribe(response => {
      this.categories = response;
      // this.data = this.listings;
      // console.log(this.listings);
      this.setTotalPages();
      this.onPageChange(this.currentPage);
      this.loading = false;
      // console.log(this.listings);
    }, (error: Response) => {
        this.loading = false;
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    })
    
  }

  initializeTable() {
    this.onPageChange(this.currentPage);
    this.setTotalPages();
  }

  getDateString(str) {
    return new Date(str).toLocaleString();
  }

  onPageChange(page) {
    // console.log(this.dispatchServices);
    this.data = [...(this.categories || [])];
    this.data = this.data.splice((page - 1) * this.pageSize, this.pageSize);
    this.currentPage = page;
  }

  setTotalPages() {
    const length = (this.categories || []).length;
    if (length > 0) {
      const pages = (length % this.pageSize) === 0 ? (length / this.pageSize) : Math.floor(length / this.pageSize) + 1;
      this.totalPages = Array(pages).fill(0).map((x, i) => i + 1);
    }
  }

  ngOnChanges(changes) {
    if (typeof changes.auction === 'undefined') {
      this.initializeTable();
    }
  }

  approveItem(id){
    // this.loading = true;
    // this.itemService.update({
    //   _id: id,
    //   approved: true
    // }).subscribe((data) => {
    //   this.loading = false;
    //   this.onDataChange.emit(data);
    // }, () => {
    //   alert('Error while approving this auction');
    //   this.loading = false;
    // });
  }

}
