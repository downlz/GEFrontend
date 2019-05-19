import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuctionService} from '../../services/auction.service';

@Component({
  selector: 'app-bids-table',
  templateUrl: './bids-table.component.html',
  styleUrls: ['./bids-table.component.scss']
})
export class BidsTableComponent implements OnInit, OnChanges {

  @Input()
  bids: Array<any> = [];
  @Input()
  unit: any;
  pageSize = 5;
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

  constructor(private auth: AuthService, private auctionService: AuctionService, private modalService: NgbModal) {
    this.role = auth.getRole();
    this.userId = auth.getId();
  }

  ngOnInit() {
  }

  initializeTable() {

    this.onPageChange(this.currentPage);
    this.setTotalPages();
  }

  getDateString(str) {
    return new Date(str).toLocaleString();
  }

  onPageChange(page) {
    this.data = [...(this.bids || [])];
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

  openBidHistory(content, bid) {
    this.bid = bid;
    this.auctionService.getBidHistory(bid.auction._id, bid.createdBy._id).subscribe((data) => {
        this.bidHistoryData = data;
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        }, (reason) => {
          this.bidHistoryData = [];
          this.bid = null;
        });
      }
      , (err) => {
        this.bidHistoryData = [];
        this.bid = null;
      });
  }
}
