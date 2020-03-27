import { ItemService } from './../../services/item.service';

import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ListingService } from '../../services/listing.service';
import { ActivatedRoute,Router } from '@angular/router';
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
  allfetchedlisting: Array<any> = [];

  _search = "";

  constructor(private auth: AuthService,
    private listingService: ListingService,
    private itemService: ItemService,
    private route: ActivatedRoute,
    // private modalService: NgbModal, private toastr: ToastrService,
    private router: Router) {
    this.role = auth.getRole();
    // this.userId = auth.getId();
    // this.manufacturerService.getAll().subscribe((resp) => {
    //   this.manufacturers = resp;
    // });
  }

  get search() {
    return this._search;
  }

  ngOnInit() {
    // this.route.queryParams
    // .subscribe(params => {
    //   const pageid = params.get('page');
    //   console.log(pageid);
    //   // this.itemid = id;
    //   // this.getProduct(id);
    // });

    const currentUser = this.auth.currentUserValue;
    if (this.role == 'admin') {
      this.itemService.getallitem()
    .subscribe(response => {
      this.listings = response;
      this.allfetchedlisting = this.listings;
      // this.data = this.listings;
      // console.log(this.listings);
      this.filterChange();
      // this.setTotalPages();
      // this.onPageChange(this.currentPage);
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
      this.allfetchedlisting = this.listings;
      this.filterChange();
      // this.setTotalPages();
      // this.onPageChange(this.currentPage);
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

  set search(value: string) {
    this._search = value;
    if (value) {
      let lowercase = value.toLowerCase().trim();
      this.listings = this.listings.filter(item => {
        return item.name.name.toLowerCase().indexOf(lowercase) >= 0
          || item.category.name.toLowerCase().indexOf(lowercase) >= 0
          || item.origin.toLowerCase().indexOf(lowercase) >= 0
          || item.seller.name.toLowerCase().indexOf(lowercase) >= 0
          || item.manufacturer.name.toLowerCase().indexOf(lowercase) >= 0
          || item.sampleNo.toLowerCase().indexOf(lowercase) >= 0
      });
    } else {
      this.listings = this.allfetchedlisting;
    }
    this.filterChange();
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

  getProduct(id){
    // this.listingService.get(id)
    // .subscribe(response => {
    //   this.listing = response as Listing;
    // }, (error: Response) => {
    //   this.router.navigate(['/errorpage']);
    //   if (error.status === 400) {
    //     alert(' expected error, post already deleted');
    //   }
    //   console.log(error);
    // });
  }

  ngOnChanges(changes) {
    if (typeof changes.auction === 'undefined') {
      this.initializeTable();
    }
  }
  filterChange(){
    this.setTotalPages();
    this.onPageChange(this.currentPage);
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
