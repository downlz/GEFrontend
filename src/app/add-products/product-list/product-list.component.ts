import { ItemService } from './../../services/item.service';

import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ListingService } from '../../services/listing.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  unit: any;
  pageSize = 15;
  currentPage = 1;
  data: Array<any>;
  totalPages: Array<Number> = [];
  role: string;
  manufacturers: any = [];
  loading : boolean = true;
  listings: any;
  queryParams = '';

  constructor(private auth: AuthService,
    private listingService: ListingService,
    private itemService: ItemService,
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
    if (this.role == 'admin') {
      this.itemService.getallitem()
    .subscribe(response => {
      this.listings = response;
      // this.data = this.listings;
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
    });
    } else {
      this.listingService.getCurrentUserListings()
    .subscribe(response => {
      this.listings = response;
      // this.data = this.listings;
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
    });
    }
    
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
    this.data = [...(this.listings || [])];
    this.data = this.data.splice((page - 1) * this.pageSize, this.pageSize);
    this.currentPage = page;
  }

  setTotalPages() {
    const length = (this.listings || []).length;
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
