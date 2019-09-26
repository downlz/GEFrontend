import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UploadBillService } from '../services/uploadbill.service';
import { OrderService } from '../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppError } from '../common/app-error';
import { MyorderService } from '../services/myorder.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {
  role: string;
  orders: any;
  selectedFile: File = null;
  apiurl: string;
  states = ['new', 'confirmed', 'ready','shipped', 'delivered','cancelled'];

  pageSize = 15;
  currentPage = 1;
  data: Array<any>;
  totalPages: Array<Number> = [];
  currentDateTime: any;
  loading: Boolean = true;

  constructor(private authenticationService: AuthService, private orderService: OrderService,
    private route: ActivatedRoute, private uploadbill : UploadBillService ,
    private myorderService: MyorderService,private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    const role = this.authenticationService.getRole();
    this.role = role;
    this.apiurl = environment.baseUrl;
    const currentUser = this.authenticationService.currentUserValue;
    // // For seller
    // this.myorderService.get(currentUser._id)

    // For Admin
    if (this.role === 'admin') {
    this.orderService.getAll()
    .subscribe(response => {
      this.orders = response as any;
      this.setTotalPages();
      this.onPageChange(this.currentPage);
      this.loading = false;
      // console.log(this.orders);
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });
    } else if (this.role === 'seller') {
      this.myorderService.get(currentUser._id)
      .subscribe(response => {
        this.orders = response as any;
        this.setTotalPages();
        this.onPageChange(this.currentPage);
        this.loading = false;
        // console.log(this.orders);
      }, (error: Response) => {
        this.router.navigate(['/errorpage']);
        if (error.status === 400) {
          alert(' expected error, post already deleted');
        }
        console.log(error);
      });
    }
    
  }


  onFileSelected(event){
    // console.log(event)
    this.selectedFile = event.target.files[0];
  }
  uploadManualBill(event,order){
    this.selectedFile = <File>event.target.files[0];
    const uploadData = {
      orderId : order._id,
      // addedOn : Date.now(),          // For Future enhancements
      // myFile : this.selectedFile
    }
    // console.log(uploadData);
    const fd = new FormData()
    fd.append('myFile',this.selectedFile,this.selectedFile.name)
    fd.append('orderId',uploadData.orderId)
    // fd.append('addedOn', uploadData.addedOn)
    // fd.orderId = order._id

    this.uploadbill.create(fd)
    .subscribe(response => {
      // reportProgress: true,
      alert('Bill added successfully');
      this.router.navigate(['/allOrders']);
    }, (error: AppError) => {
      console.log(error);
      // this.router.navigate(['/errorpage']);
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

  updateOrder(order) {
    if (order.status === "cancelled"){
      var remarks = prompt("Add cancellation remarks as applicable", ""); 
      order.remarks = remarks;
    }
    this.currentDateTime = new Date().getTime();
    // console.log(order);
    const updateData = {
      _id: order._id,
      status:  order.status,
      remarks: order.remarks,
      // lastUpdated: this.currentDateTime
    };
    // console.log(updateData);
    if (order.status == "cancelled" && order.remarks == null) {
      this.toastr.info('A cancellation remark is mandatory','Cancellation not performed',{
        positionClass: 'toast-bottom-center'
      });
    } else {
    this.orderService.update(updateData)
    .subscribe(response => {
      // console.log(response);
      alert('Order status updated successfully');
    }, (error: AppError) => {
      console.log(error);
        this.router.navigate(['/errorpage']);
      console.log(error.originalError.status);
    });
  }
}

}