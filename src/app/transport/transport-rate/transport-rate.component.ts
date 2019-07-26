import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TransportRateService} from '../../services/transportrate.service';
// import {BidService} from '../../services/bid.service';
import { ActivatedRoute, Router } from '@angular/router';
// import {OrderService} from '../../services/order.service';
// import {ManufacturerService} from '../../services/manufacturer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transport-rate',
  templateUrl: './transport-rate.component.html',
  styleUrls: ['./transport-rate.component.scss']
})
export class TransportRateComponent implements OnInit, OnChanges {

  @Input()
  bids: Array<any> = [];
  @Input()
  unit: any;
  pageSize = 15;
  currentPage = 1;
  data: Array<any>;
  totalPages: Array<Number> = [];
  role: string;
  @Input()
  bidHistory: boolean;
  @Input()
  confirmOrder: boolean;
  bidHistoryData: any;
  // @Input()
  // auction: any;
  userId: any;
  bid: any;
  @Input()
  transportrates: any;
  manufacturers: any = [];
  loading: boolean;

  constructor(private auth: AuthService, 
    private transportRate: TransportRateService, 
    private modalService: NgbModal, private toastr: ToastrService,
    private router: Router ) {
    this.role = auth.getRole();
    this.userId = auth.getId();
    // this.manufacturerService.getAll().subscribe((resp) => {
    //   this.manufacturers = resp;
    // });
  }

  ngOnInit() {
    const currentUser = this.auth.currentUserValue;
    this.loading = true;
    if (currentUser.isAdmin === true ) {
      this.transportRate.getAll()
        .subscribe(response => {
          this.loading = false;
          this.transportrates = response as any;
          this.setTotalPages();
          this.onPageChange(this.currentPage);
        }, (error: Response) => {
            this.loading = false;
          this.router.navigate(['/errorpage']);
          if (error.status === 400) {
            alert(' expected error, post already deleted');
          }
          console.log(error);
        }); 
    } else {
      this.transportRate.getuser(currentUser._id)
      .subscribe(response => {                            // Repeatitive code block
        this.loading = false;
        this.transportrates = response as any;
        this.setTotalPages();
        this.onPageChange(this.currentPage);
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
    // console.log(this.transportrates);
    this.data = [...(this.transportrates || [])];
    this.data = this.data.splice((page - 1) * this.pageSize, this.pageSize);
    this.currentPage = page;
  }

  setTotalPages() {
    const length = (this.bids || []).length;
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

}

