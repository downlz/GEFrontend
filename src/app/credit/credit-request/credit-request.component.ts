import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidators} from '../../login/login-form.validators';
import {CityService} from '../../services/city.service';
import {StateService} from '../../services/state.service';
import { forkJoin } from 'rxjs';
import {UserService} from '../../services/user.service';
import {CreditRequestService} from '../../services/creditrequest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppError } from '../../common/app-error';

@Component({
  selector: 'app-credit-request',
  templateUrl: './credit-request.component.html',
  styleUrls: ['./credit-request.component.scss']
})
export class CreditRequestComponent implements OnInit {

  form = new FormGroup({
    creditrequest: new FormGroup({
      // 'name' : new FormControl('', [Validators.required,
      //   Validators.minLength(3),
      //   Validators.maxLength(50)]),
      'email' : new FormControl('', [Validators.email]),
      'annualturnover' : new FormControl('', [Validators.required]),
      'lastthreeturnovr' : new FormControl(''),
      'tradeitems' : new FormControl('', [Validators.required]),
      'phone' : new FormControl('', [Validators.required, Validators.minLength(6),
        Validators.maxLength(20), 
        // Validators.pattern('^[0-9]*$'),
        FormValidators.cannotContainSpace],
        FormValidators.shouldBeUnique)
    })
  });
  
  // cities: any;
  // states: any;
  userid: any;
  activecreditrequest : any = {};
  isoldrequest: Boolean = false;
  loading: Boolean = true;
  statusmsg: String;

  creditrequestData: any;
  constructor(private userService: UserService,private route: ActivatedRoute, private creditrequestservice: CreditRequestService,  
    private router: Router) { }

  ngOnInit() {
    
    this.userService.get('me')
    .subscribe(response => {
      const res = response as any;
      this.userid = res._id;
      this.creditrequestservice.getUserCreditRequest(this.userid)
      .subscribe(response => {
        const res = response as any;
        this.activecreditrequest = res[0];
        if (this.activecreditrequest!= undefined) {
          this.isoldrequest = true;
          this.getCreditRequestStatus();
        }
        this.loading = false;
      })
      // this.loading = false;  
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });
    
  }

  get phone () {
    return this.form.get('creditrequest.phone');
  }

  get name () {
    return this.form.get('creditrequest.name');
  }

  get tradeitems () {
    return this.form.get('creditrequest.tradeitems');
  }

  get annualturnover () {
    return this.form.get('creditrequest.annualturnover');
  }

  get lastthreeturnovr () {
    return this.form.get('creditrequest.lastthreeturnovr');
  }

  getCreditRequestStatus() {

    // Improve Standard by saving details in db
    if (this.activecreditrequest.status === 'submitted') {
      this.statusmsg = 'Request is being verified by graineasy. Your  profile will be shared with our Banking partner';
      return 1;
    }
    if (this.activecreditrequest.status === 'proposed') {
      this.statusmsg = 'Our banking partner has agreed to review your request. Please submit your docs to trade@graineasy.com';
      return 2;
    }
    if (this.activecreditrequest.status === 'pending') {
      this.statusmsg = 'Our banking partner are looking into your docs. They will take a call to sanction/reject a credit limit for you';
      return 3;
    }
    if (this.activecreditrequest.status === 'awaiting') {
      this.statusmsg = 'Credit limit sanctioned from our banking partner';
      return 4;
    }
    if (this.activecreditrequest.status === 'accepted') {
      this.statusmsg = 'Credit letter generated successfully. It will be shared with you over email. Use this to fund your stocks';
      return 5;
    }
    if (this.activecreditrequest.status === 'cancelled') {
      this.statusmsg = 'Request was cancelled and cannot be fulfilled at this moment';
      return 5;
    }
    if (this.activecreditrequest.status === 'rejected') {
      this.statusmsg = 'Credit request cannot be fulfilled at this moment';
      return 5;
    }
    if (this.activecreditrequest.status === 'withdrawn') {
      this.statusmsg = 'You have successfully withdrawn your request.To raise fresh request please contact trade@graineasy.com';
      return 5;
    }
  }

  getDrawDownStatus() {

    // Improve Standard by saving details in db
    if (this.activecreditrequest.status === 'drawdownrequested') {
      this.statusmsg = 'Request partnering bank for a drawdown from you sanctioned Credit Limit';
      return 1;
    }
    if (this.activecreditrequest.status === 'cmvist') {
      this.statusmsg = 'Request the Collateral Manager for warehouse receipt';
      return 2;
    }
    if (this.activecreditrequest.status === 'warehousereceipt') {
      this.statusmsg = 'Warehouse receipt generated';
      return 3;
    }
    if (this.activecreditrequest.status === 'drawdownapproved') {
      this.statusmsg = 'Bank has approved the drawdown';
      return 4;
    }
    if (this.activecreditrequest.status === 'fundstransfer') {
      this.statusmsg = 'Funds have been transferred';
      return 5;
    }
  }

  referNow() {
    const formData = {
      phone:  this.form.value.creditrequest.phone,
      name:   this.form.value.creditrequest.name,
      tradeitems : this.form.value.creditrequest.tradeitems,
      lastthreeturnovr : this.form.value.creditrequest.lastthreeturnovr,
      annualturnover : this.form.value.creditrequest.annualturnover,
      user: this.userid,
      status: 'submitted'
    };
    this.creditrequestservice.create(formData)
    .subscribe(response => {
      this.creditrequestData = response;;
      alert('Request was successfully submitted.');
      this.router.navigate(['/products']);
    }, err => {
      this.router.navigate(['/errorpage']);
    });
  }

  withdrawRequest() {
    const withdrawRqst = {
      status: 'withdrawn',
      _id : this.activecreditrequest._id,
      remarks : 'Request was withdrawn by customer'
    };
    this.creditrequestservice.update(withdrawRqst).subscribe((response) => {
      alert('The request was withdrawn successfully');
      this.router.navigate(['/products']);
    }, err => {
      this.router.navigate(['/errorpage']);
    });
  }
}


