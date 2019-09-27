import { UserService } from './../../../services/user.service';
import {AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  role: string;
  type: any;
  usertypes = ['seller', 'buyer', 'agent','transporter','admin','NA'];

  constructor(private modalService: NgbModal, private router: Router,
    private userService: UserService) { }

  ngOnInit() {
        this.form = new FormGroup({
          newItem: new FormGroup({
            userType: new FormControl('', [
              Validators.required]),
            vendorCode: new FormControl('', []),
            isactive: new FormControl('', [Validators.required])
          })
        });
}

  ngAfterViewInit() {
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
    return this.type;
    
  }

  save(event) {
    this.submitted = true;
    event.preventDefault();
    if (this.form.valid) {
      this.loading = true;
      const userdtl = this.form.getRawValue().newItem;
      userdtl._id = this.users._id;
      switch (userdtl.userType) {
        case  'admin':
            userdtl.isAdmin = 'true'
          break;
        case  'buyer':
            userdtl.isBuyer = 'true'
            userdtl.isSeller = 'false'
            userdtl.isTransporter = 'false'    
            userdtl.isAgent = 'false'
          break;
        case  'seller':
            userdtl.isSeller = 'true'
            userdtl.isBuyer = 'false'
            userdtl.isTransporter = 'false'
            userdtl.isAgent = 'false'
          break;
        case  'transporter':
            userdtl.isTransporter = 'true'
            userdtl.isSeller = 'false'
            userdtl.isBuyer = 'false'
            userdtl.isAgent = 'false'
          break;
        case  'agent':
            userdtl.isAgent = 'true'
            userdtl.isBuyer = 'false'      
            userdtl.isTransporter = 'false'        
            userdtl.isSeller = 'false'           
        break;
      }    
      if (!userdtl.vendorCode) {
        userdtl.vendorCode = this.users.vendorCode
      }
      this.userService.update(userdtl).subscribe((response) => {
        // this.loading = false;
        this.modal.close();
        this.redirectTo('/users/usersmgmt');
      }, err => {
        this.loading = false;
        alert('There was a server error while updating user profile');
      });

    }
  }

  redirectTo(uri) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate([uri]));
  }

  getErrors(name) {
    if (!this.form.controls.newItem['controls'][name]) {
      return {};
    } else {
      return this.form.controls.newItem['controls'][name].errors || {};
    }
  }
}
