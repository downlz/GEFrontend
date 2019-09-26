import { UserService } from './../../../services/user.service';
import {AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
// import {BidService} from '../../../services/bid.service';
// import {AuthService} from '../../services/auth.service';
// import {ManufacturerService} from '../../services/manufacturer.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  @Input()
  modal: any;
  @Input()
  users: any;
  loading: boolean;
  submitted: boolean;
  @ViewChild('quantity')
  quantity: ElementRef;
  role: string;
  type: any;
  showMarketingExpense: Boolean = false;
  manufacturerNotPresent: Boolean = false;
  manufacturers: Array<any> = [];
  usertypes = ['seller', 'buyer', 'agent','transporter','admin','NA'];
  userstatus = ['true','false'];
  // bids: Array<any>;

  constructor(private modalService: NgbModal, 
    private userService: UserService) {
    // this.role = this.authService.getRole();
    // bidService.getCurrentUserData().subscribe((data: Array<any>) => {
    //   this.bids = data;
    //   this.loading = false;
    //   console.log(this.bids);
    // }, (err) => {
    //   console.error(err);
      // this.loading = false;
    // });
  }

  ngOnInit() {

    // this.manufacturerService.getAll().subscribe((data: any) => {
    //   this.manufacturers = data;
    // });
    // if (this.users) {
      // if (this.role === 'seller') {
        this.form = new FormGroup({
          newItem: new FormGroup({
            usertype: new FormControl('', [
              Validators.required]),
            vcode: new FormControl('', [Validators.required]),
            status: new FormControl('', [])
          })
        });
      // }
  // }
  // this.loading = false;
}

  ngAfterViewInit() {
    // if (this.quantity) {
    //   setTimeout(() => this.quantity.nativeElement.focus());
    // }
  }

  getUserType(res) {
    if (res.isAdmin == true){
      this.type = 'admin'
    } else if (res.isBuyer == true){
      this.type = 'buyer'
    } else if (res.isSeller == true){
      this.type = 'seller'
    } else if (res.isAgent == true){
      this.type = 'agent'
    } else if (res.isTransporter == true){
      this.type = 'transporter'
    } else {
      this.type = 'NA'
    }
    // this.users.status = this.usertype;
    // console.log(this.type);
    return this.type;
    
  }

  save(event) {
    this.submitted = true;
    event.preventDefault();
    console.log(this.form.getRawValue().newItem);
    if (this.form.valid) {

    console.log("here");
      this.loading = true;
      const userdtl = this.form.getRawValue().newItem;
      userdtl.id = this.users._id;
      console.log(userdtl);
      // this.bidService.create(bid).subscribe((response) => {
      //     this.loading = false;
      //   alert('Bid Placed successfully');
      //   this.modal.close();
      // }, err => {
      //   this.loading = false;
      //   alert('There was a server error while bidding on this auction');
      // });

    }
  }

  getErrors(name) {
    // if (!this.form.controls.newItem['controls'][name]) {
    //   return {};
    // } else {
    //   return this.form.controls.newItem['controls'][name].errors || {};
    // }
  }
}
