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
  totalRecords : Number;
  allfetchedlisting: Array<any> = [];
  pageid: any;
  p: number = 1;
  isSearchData : boolean = false;

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
    //   this.pageid = params['page'];     // Using this instead of const to set page id
    //   // const pageSize = params['pageSize'];  // Currently being set manually as 15
      
    //   if (!this.pageid) {
    //     this.pageid = 1;
    //   }
      const currentUser = this.auth.currentUserValue;
      if (this.role == 'admin') {
          this.getPage(1);
        // this.currentPage = this.pageid;
        // this.itemService.getallitem()
      //   this.itemService.getallitembypage(this.pageid,this.pageSize)
      //   .subscribe(response => {
      //   this.listings = response;
      //   this.allfetchedlisting = this.listings;
      //   this.data = [...(this.listings._embedded.items || [])];
      //   this.totalRecords = this.listings.totalRecords;
      //   // this.data = this.listings;
      //   // console.log(this.listings);
      //   // this.filterChange();     //Disabled to test pagination using new module
      //   // this.setTotalPages();
      //   // this.onPageChange(this.currentPage);
      //   this.loading = false;
      //   // console.log(this.listings);
      // }, (error: Response) => {
      //     this.loading = false;
      //   this.router.navigate(['/errorpage']);
      //   if (error.status === 400) {
      //     alert(' expected error, post already deleted');
      //   }
      //   console.log(error);
      // });
      } else {
        this.getUserPage(1);
      //   this.listingService.getCurrentUserListings()
      //   .subscribe(response => {
      //     this.listings = response;
      //     // this.allfetchedlisting = this.listings;
      //     // this.filterChange();
      //     // this.setTotalPages();
      //     // this.onPageChange(this.currentPage);
      //     this.loading = false;
      //     // console.log(this.listings);  
      // }, (error: Response) => {
      //     this.loading = false;
      //     this.router.navigate(['/errorpage']);
      //     if (error.status === 400) {
      //       alert(' expected error, post already deleted');
      //     }
      //     console.log(error);
      // });
      }
    // });
  }

  initializeTable() {
    this.onPageChange(this.currentPage);
    this.setTotalPages();
  }

  // set search(value: string) {
    searchItem(value: string) {
    // this.loading = true;
    // this._search = value;
    // if (value) {
    //   let lowercase = value.toLowerCase().trim();
    //   this.listings = this.listings.filter(item => {
    //     return item.name.name.toLowerCase().indexOf(lowercase) >= 0
    //       || item.category.name.toLowerCase().indexOf(lowercase) >= 0
    //       || item.origin.toLowerCase().indexOf(lowercase) >= 0
    //       || item.seller.name.toLowerCase().indexOf(lowercase) >= 0
    //       || item.manufacturer.name.toLowerCase().indexOf(lowercase) >= 0
    //       || item.sampleNo.toLowerCase().indexOf(lowercase) >= 0
    //   });
    // } else {
    //   this.listings = this.allfetchedlisting;
    // }
    // // this.filterChange();
    // this.loading = false;
    
    // Calling search API
    this.isSearchData = true;
    this.loading = true;
    this.itemService.itemSearch(value)
        .subscribe(response => {
        this.listings = response;
        this.data = [...(this.listings._embedded.items || [])];
        this.totalRecords = this.listings.totalRecords;
        this.p = 1;
        this.loading = false;
      }, (error: Response) => {
            this.loading = false;
          this.router.navigate(['/errorpage']);
          if (error.status === 400) {
            alert('Unexpected error, error while calling search query');
          }
          console.log(error);
        });
  } 

  getPageSearch(page: number) {
    this.loading = true;
    this.isSearchData = true;
    this.itemService.getallitembypage(page,this.pageSize)
        .subscribe(response => {
        this.listings = response;
        this.data = [...(this.listings._embedded.items || [])];
        this.totalRecords = this.listings.totalRecords;
        this.p = page;
        this.loading = false;
      }, (error: Response) => {
            this.loading = false;
          this.router.navigate(['/errorpage']);
          if (error.status === 400) {
            alert('Unexpected error, error while calling search query');
          }
          console.log(error);
        });
  }

  getPage(page: number) {
    this.loading = true;
    this.itemService.getallitembypage(page,this.pageSize)
        .subscribe(response => {
        this.listings = response;
        this.data = [...(this.listings._embedded.items || [])];
        this.totalRecords = this.listings.totalRecords;
        this.p = page;
        this.loading = false;
      }, (error: Response) => {
            this.loading = false;
          this.router.navigate(['/errorpage']);
          if (error.status === 400) {
            alert('Unexpected error, error while calling search query');
          }
          console.log(error);
        });
  }

  getUserPage(page: number) {
    this.loading = true;
    this.listingService.getCurrentUserListings(page,this.pageSize)
        .subscribe(response => {
        this.listings = response;
        this.data = [...(this.listings._embedded.items || [])];
        this.totalRecords = this.listings.totalRecords;
        this.p = page;
        this.loading = false;
      }, (error: Response) => {
            this.loading = false;
          this.router.navigate(['/errorpage']);
          if (error.status === 400) {
            alert('Unexpected error, error while calling search query');
          }
          console.log(error);
        });
  }

  getDateString(str) {
    return new Date(str).toLocaleString();
  }

  onPageChange(page) {
    this.data = [...(this.listings._embedded.items || [])];
    this.data = this.data.splice((page - 1) * this.pageSize, this.pageSize);
    this.currentPage = page;
  }

  setTotalPages() {
    // const length = (this.listings || []).length;
    const length = this.listings.totalRecords;
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
