import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {AuctionService} from '../../services/auction.service';
import {AuthService} from '../../services/auth.service';
import * as $ from 'jquery';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-auction-table',
  templateUrl: './auction-table.component.html',
  styleUrls: ['./auction-table.component.scss']
})
export class AuctionTableComponent implements OnInit, OnChanges {
  @Input()
  auctions: Array<any> = [];
  @Input()
  actions: Array<any> = [];
  @Output()
  onDataChange = new EventEmitter();
  @Input()
  loading: boolean;
  pageSize = 5;
  currentPage = 1;
  data: Array<any>;
  totalPages: Array<Number> = [];
  role: string;
  userId: string;
  selectedAuction: any;
  currentTimestamp = new Date().getTime();

  constructor(private service: AuctionService, private auth: AuthService, private modalService: NgbModal) {
    this.role = auth.getRole();
    this.userId = auth.getId();
  }

  ngOnInit() {
    this.initializeTable();
  }

  initializeTable() {

    this.onPageChange(this.currentPage);
    this.setTotalPages();
  }

  getDateString(str) {
    return new Date(str).toLocaleString();
  }

  getTimeStamp(string) {
    const date = new Date(string);
    return date.getTime();
  }

  approveAuction(id) {
    this.loading = true;
    this.service.update({
      _id: id,
      approved: true
    }).subscribe((data) => {
      this.loading = false;
      this.onDataChange.emit(data);
    }, () => {
      alert('Error while approving this auction');
      this.loading = false;
    });
  }

  onPageChange(page) {
    this.data = [...(this.auctions || [])];
    this.data = this.data.splice((page - 1) * this.pageSize, this.pageSize);
    this.currentPage = page;
  }

  setTotalPages() {
    const length = (this.auctions || []).length;
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

  placeBid(content, auction) {
    this.selectedAuction = auction;
    console.log(auction);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.selectedAuction = null;
    }, (reason) => {
      this.selectedAuction = null;
    });
  }
}
