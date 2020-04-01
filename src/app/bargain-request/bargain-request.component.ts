import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
// import { OrderService } from '../services/order.service';
import { BargainService } from '../services/bargain.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppError } from '../common/app-error';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bargain-request',
  templateUrl: './bargain-request.component.html',
  styleUrls: ['./bargain-request.component.scss']
})
export class BargainRequestComponent implements OnInit {
  role: string;
  bargain: any;
  selectedFile: File = null;
  apiurl: string;

  pageSize = 15;
  currentPage = 1;
  data: Array<any>;
  totalPages: Array<Number> = [];
  currentDateTime: any;
  loading : boolean = true;
  totalRecords : Number;
  pageid: any;
  p: number = 1;
  userid: string;

  constructor(private authenticationService: AuthService,
    private route: ActivatedRoute, private toastr: ToastrService,
    private bargainService: BargainService , private router: Router) { }

  ngOnInit() {
    const role = this.authenticationService.getRole();
    this.role = role;
    this.apiurl = environment.baseUrl;
    const currentUser = this.authenticationService.currentUserValue;
    this.userid = currentUser._id;
    // // For seller
    // this.myorderService.get(currentUser._id)

    // For Admin
    if (this.role === 'admin'){
      this.getPage(1);
    // this.bargainService.getAll()
    // .subscribe(response => {
    //   this.bargain = response as any;
    //   this.loading = false;
    //   this.setTotalPages();
    //   this.onPageChange(this.currentPage);
    //   // console.log(this.orders);
    // }, (error: Response) => {
    //   this.router.navigate(['/errorpage']);
    //   if (error.status === 400) {
    //     alert(' expected error, post already deleted');
    //   }
    //   console.log(error);
    // });
    } else if (this.role === 'seller') {
      this.getSellerPage(1);
      // this.bargainService.getSellerAllBargain(currentUser._id)
      // .subscribe(response => {
      //   this.loading = false;
      //   this.bargain = response as any;
      //   this.setTotalPages();
      //   this.onPageChange(this.currentPage);
      //   // console.log(this.orders);
      // }, (error: Response) => {
      //   this.router.navigate(['/errorpage']);
      //   if (error.status === 400) {
      //     alert(' expected error, post already deleted');
      //   }
      //   console.log(error);
      // });
    } else if (this.role === 'buyer') {
      this.getBuyerPage(1);
      // this.bargainService.getBuyerAllBargain(currentUser._id)
      // .subscribe(response => {
      //   this.loading = false;
      //   this.bargain = response as any;
      //   this.setTotalPages();
      //   this.onPageChange(this.currentPage);
      //   // console.log(this.orders);
      // }, (error: Response) => {
      //   this.router.navigate(['/errorpage']);
      //   if (error.status === 400) {
      //     alert(' expected error, post already deleted');
      //   }
      //   console.log(error);
      // });
  } else {

  }
}

getPage(page: number){
  this.loading = true;
    this.bargainService.getAllBargain(page,this.pageSize)
        .subscribe(response => {
          this.bargain = response;
          this.data = [...(this.bargain._embedded.bargains || [])];
          this.totalRecords = this.bargain.totalRecords;
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

getBuyerPage(page:number){
  this.loading = true;
    this.bargainService.getBuyerAllBargain(this.userid,page,this.pageSize)
        .subscribe(response => {
          this.bargain = response;
          this.data = [...(this.bargain._embedded.bargains || [])];
          this.totalRecords = this.bargain.totalRecords;
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

getSellerPage(page:number){
  this.loading = true;
    this.bargainService.getSellerAllBargain(this.userid,page,this.pageSize)
        .subscribe(response => {
          this.bargain = response;
          this.data = [...(this.bargain._embedded.bargains || [])];
          this.totalRecords = this.bargain.totalRecords;
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
  onPageChange(page) {
    this.data = [...(this.bargain || [])];
    this.data = this.data.splice((page - 1) * this.pageSize, this.pageSize);
    this.currentPage = page;
  }

  setTotalPages() {
    const length = (this.bargain || []).length;
    // console.log(this.listings)
    if (length > 0) {
      const pages = (length % this.pageSize) === 0 ? (length / this.pageSize) : Math.floor(length / this.pageSize) + 1;
      this.totalPages = Array(pages).fill(0).map((x, i) => i + 1);
    }
  }

}