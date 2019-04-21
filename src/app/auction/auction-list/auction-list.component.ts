import {Component, OnInit} from '@angular/core';
import {ListingService} from '../../services/listing.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.scss']
})
export class AuctionListComponent implements OnInit {
  listings: any;

  constructor(private service: ListingService, private router: Router) {
  }

  ngOnInit() {
    this.service.getAll('')                // pass params for filters
      .subscribe(response => {
        this.listings = response;
      }, (error: Response) => {
        this.router.navigate(['/errorpage']);
        if (error.status === 400) {
          alert(' expected error, post already deleted');
        }
        console.log(error);
      });
  }

}
