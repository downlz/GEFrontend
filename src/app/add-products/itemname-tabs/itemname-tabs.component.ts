import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
// import {AuctionService} from '../../services/auction.service';
// import {forkJoin} from 'rxjs';
import {AuthService} from '../../services/auth.service';
// import {ManufacturerService} from '../../services/manufacturer.service';

@Component({
  selector: 'app-itemname-tabs',
  templateUrl: './itemname-tabs.component.html',
  styleUrls: ['./itemname-tabs.component.scss']
})
export class ItemnameTabComponent implements OnInit {
  auction: any;
  listing: any;
  activeTab: string = 'addProduct';
  loading: boolean = true;
  role: string;
  userId: string;

  constructor(private route: ActivatedRoute, 
    private auth: AuthService, 
    // private manufacturerService: ManufacturerService, 
    private router: Router,) {
  }

  ngOnInit() {
    this.role = this.auth.getRole();
    this.userId = this.auth.getId();
    this.createProductDtl();
  }

  createProductDtl() {
    this.route.queryParamMap.subscribe((data) => {
      const tab = data.get('tab');
      if (tab) {
        this.activeTab = tab;  
      }
      this.loading = false;
    });
    // this.route.paramMap
    //   .subscribe(params => {
    //     const id = params.get('id');
    //     this.auctionService.get(id).subscribe((data) => {
    //       this.auction = data;
    //       this.listing = this.auction.sampleNo;
    //       this.loading = false;
    //     }, error => {
    //       this.router.navigate(['/errorpage']);
    //       if (error.status === 400) {
    //         alert(' expected error, post already deleted');
    //       }
    //       this.loading = false;
    //       console.log(error);
    //     });
    //   });
  }

  changeTab(tab) {
    this.activeTab = tab;
  }
  
}
