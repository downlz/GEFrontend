import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuctionService} from '../../services/auction.service';

@Component({
  selector: 'app-auction-table',
  templateUrl: './auction-table.component.html',
  styleUrls: ['./auction-table.component.scss']
})
export class AuctionTableComponent implements OnInit {
  @Input()
  auctions: Array<any>;
  @Input()
  actions: Array<any>;
  @Output()
  onDataChange = new EventEmitter();
  @Input()
  loading: boolean;

  constructor(private service: AuctionService) {
  }

  ngOnInit() {
  }


  getDateString(str) {
    return new Date(str).toLocaleString();
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
}
