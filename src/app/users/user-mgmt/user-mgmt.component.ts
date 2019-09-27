import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UploadBillService } from '../../services/uploadbill.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppError } from '../../common/app-error';
import { MyorderService } from '../../services/myorder.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import {FormGroup, FormControl, Validators, ValidationErrors, ValidatorFn, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-user-mgmt',
  templateUrl: './user-mgmt.component.html',
  styleUrls: ['./user-mgmt.component.scss']
})
export class UserMgmtComponent implements OnInit {
  role: string;
  users: any;
  selectedFile: File = null;
  apiurl: string;

  pageSize = 15;
  currentPage = 1;
  data: Array<any>;
  model: Array<any> = [];
  totalPages: Array<Number> = [];
  currentDateTime: any;
  loading: Boolean = true;
  usertype: string;
  allFormControls: any;
  formControls: any;
  form: any;
  selectedUser: any;
  usertypes = ['seller', 'buyer', 'agent','transporter','admin','NA'];
  userstatus = ['true','false'];

  constructor(private authenticationService: AuthService, private userService: UserService,
    private modalService: NgbModal,private router: Router) { }


  ngOnInit() {
    
    const role = this.authenticationService.getRole();
    this.role = role;
    this.apiurl = environment.baseUrl;
    // this.router.events.pipe(
    //   filter((event: RouterEvent) => event instanceof NavigationEnd)
    // ).subscribe(() => {
    //   this.fetchData();
    // });
    // const currentUser = this.authenticationService.currentUserValue;
    if (this.role === 'admin') {
      this.userService.getAll()
      .subscribe(response => {
        this.users = response as any;
        // console.log(this.users[0].isBuyer);
        // this.getUserType(this.users);
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
      } else  {
        // Do nothing
      }
    
    
  }


  onFileSelected(event){
    console.log(event)
    this.selectedFile = event.target.files[0];
  }
  uploadManualBill(event,order){
    this.selectedFile = <File>event.target.files[0];
    const uploadData = {
      orderId : order._id,
    }
    const fd = new FormData()
    fd.append('myFile',this.selectedFile,this.selectedFile.name)
    fd.append('orderId',uploadData.orderId)
  }

  getUserType(res) {
    if (res.isAdmin == true){
      this.usertype = 'admin'
    } else if (res.isBuyer == true){
      this.usertype = 'buyer'
    } else if (res.isSeller == true){
      this.usertype = 'seller'
    } else if (res.isAgent == true){
      this.usertype = 'agent'
    } else if (res.isTransporter == true){
      this.usertype = 'transporter'
    } else {
      this.usertype = 'Not Setup'
    }
    return this.usertype;
  }
  onPageChange(page) {
    this.data = [...(this.users || [])];
    this.data = this.data.splice((page - 1) * this.pageSize, this.pageSize);
    this.currentPage = page;
  }

  setTotalPages() {
    const length = (this.users || []).length;
    // console.log(this.listings)
    if (length > 0) {
      const pages = (length % this.pageSize) === 0 ? (length / this.pageSize) : Math.floor(length / this.pageSize) + 1;
      this.totalPages = Array(pages).fill(0).map((x, i) => i + 1);
    }
  }

  verifyUser(content, user) {
    this.selectedUser = user;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.selectedUser = null;
    }, (reason) => {
      this.selectedUser = null;
    });
  }

  formatphone(tel) {
    if (!tel) { return ''; }

    // var value = tel.toString().trim().replace(/^\+/, '');
    var value = tel.toString().trim().replace('+91', '');

    if (value.match(/[^0-9]/)) {
        return tel;
    }

    var country, city, number;

    switch (value.length) {
        case 10: // +1PPP####### -> C (PPP) ###-####
            country = 1;
            city = value.slice(0, 5);
            number = value.slice(2);
            break;

        case 11: // +CPPP####### -> CCC (PP) ###-####
            country = value[0];
            city = value.slice(1, 4);
            number = value.slice(4);
            break;

        case 12: // +CCCPP####### -> CCC (PP) ###-####
            country = value.slice(0, 3);
            city = value.slice(3, 5);
            number = value.slice(5);
            break;

        default:
            return tel;
    }

    if (country == 1) {
        country = "";
    }

    number = value.slice(0, 4) + '-' + value.slice(4,7) + '-' + value.slice(7,10);
    // number = '+91-' + value

    // return (country + " (" + city + ") " + number).trim();
    return (number).trim();
};

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
      // this.toastr.info('A cancellation remark is mandatory','Cancellation not performed',{
      //   positionClass: 'toast-bottom-center'
      // });
    } else {
    this.userService.update(updateData)
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