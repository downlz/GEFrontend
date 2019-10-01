import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuctionService} from '../../services/auction.service';
import {BidService} from '../../services/bid.service';
import {OrderService} from '../../services/order.service';
import {ManufacturerService} from '../../services/manufacturer.service';
import { ToastrService } from 'ngx-toastr';

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
  @Input()
  auctionType: string;
  manufacturers: any = [];

  constructor(private auth: AuthService, private manufacturerService: ManufacturerService, 
    private auctionService: AuctionService, private bidService: BidService, 
    private modalService: NgbModal,private toastr: ToastrService) {
    this.role = auth.getRole();
    this.userId = auth.getId();
    this.manufacturerService.getAll().subscribe((resp) => {
      this.manufacturers = resp;
    });
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
    // console.log(this.bids);
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

  getManufacturer(bid) {
    const manufacturer = this.manufacturers.filter((item) => {
      return item._id === bid.manufacturer;
    })[0];
    if (manufacturer) {
      return manufacturer.name;
    } else {
      return bid.manufacturer;
    }
  }

  // getBestBid(biddata) {
  //   if (!biddata) {
  //     return '';
  //   }
  //   // console.log(this.auction);
  //   if (biddata) {
  //     return biddata.auctionType === 'buyer' ? Math.min.apply(this, (biddata.bids || []).map((bid) => {
  //       return isNaN(bid.price) ? 0 : (bid.price*(1-((bid.marketingExpense)/100))).toFixed(2);
  //     })) : Math.max.apply(this, (biddata.bids || []).map((bid) => {
  //       return isNaN(bid.price) ? 0 : bid.price;
  //     }));
  //   }
  // }

  confirmBidOrder(bid) {
    // console.log(data);
    // this.orderService.get('orderno')        // Sending url as per API defination
    //   .subscribe(response => {              // improve coding standards
    //     const res = response as any;
    //     bid.orderno = parseInt(res[0].orderno) + 1;
    //     console.log(bid);
    //   // })
    this.bidService.confirmOrder(bid._id)
    .subscribe((data) => {
      console.log(this.data);
      alert('Order Confirmed successfully');
    }, (err) => {
      console.log(err);
      alert('Error while Confirming order');
    });
  // });
}
    fetchbestbid(id,type){
      this.bidService.bestbid(id,type)
      .subscribe((data) => {
        console.log(data);
        // return data[0].price
        // alert ('Best bid-' + data[0].price)
        this.toastr.success('Rs.'+data[0].price,'Best bid' ,{
          positionClass: 'toast-bottom-right'
        });
      }, (err) => {
        console.log(err);
      });
      // return data[0].price
    }
}

