import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuctionService} from '../../services/auction.service';
import {forkJoin} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {ManufacturerService} from '../../services/manufacturer.service';

@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.scss']
})
export class AuctionDetailComponent implements OnInit {
  auction: any;
  listing: any;
  activeTab: string = 'productDetails';
  loading: boolean = true;
  role: string;
  userId: string;


  constructor(private route: ActivatedRoute, private auth: AuthService, private manufacturerService: ManufacturerService, private router: Router, private auctionService: AuctionService) {

  }

  ngOnInit() {
    this.role = this.auth.getRole();
    this.userId = this.auth.getId();
    this.getAuction();
  }

  getAuction() {
    this.route.queryParamMap.subscribe((data) => {
      const tab = data.get('tab');
      if (tab) {
        this.activeTab = tab;
      }
    });
    this.route.paramMap
      .subscribe(params => {
        const id = params.get('id');
        this.auctionService.get(id).subscribe((data) => {
          this.auction = data;
          this.listing = this.auction.sampleNo;
          this.loading = false;
        }, error => {
          this.router.navigate(['/errorpage']);
          if (error.status === 400) {
            alert(' expected error, post already deleted');
          }
          this.loading = false;
          console.log(error);
        });
      });
  }

  changeTab(tab) {
    this.activeTab = tab;
  }

  /**
   * Get Best Bid
   */
  getBestBid() {
    if (!this.auction) {
      return '';
    }
    // console.log(this.auction);
    if (this.auction) {
      return this.auction.auctionType === 'buyer' ? Math.min.apply(this, (this.auction.bids || []).map((bid) => {
        return isNaN(bid.price) ? 0 : (bid.price*(1-((bid.marketingExpense)/100))).toFixed(2);
      })) : Math.max.apply(this, (this.auction.bids || []).map((bid) => {
        return isNaN(bid.price) ? 0 : bid.price;
      }));
    }
  }
}
