import { Component, OnInit } from '@angular/core';
import {GBListingService} from '../services/gblisting.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-gblistings',
  templateUrl: './gblistings.component.html',
  styleUrls: ['./gblistings.component.scss']
})

export class GBListingsComponent implements OnInit {
  gblistings: any;
  constructor(private service: GBListingService, private router: Router) { }

  ngOnInit() {
    this.service.getAll()
    // console.log(response);
    .subscribe(response => {
      this.gblistings = response;
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });
  }

}
