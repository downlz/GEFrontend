import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
// import {AuctionService} from '../../services/auction.service';
// import {forkJoin} from 'rxjs';
import {AuthService} from '../../services/auth.service';
// import {ManufacturerService} from '../../services/manufacturer.service';

@Component({
  selector: 'app-manufacturer-tabs',
  templateUrl: './manufacturer-tabs.component.html',
  styleUrls: ['./manufacturer-tabs.component.scss']
})
export class ManufacturerTabComponent implements OnInit {
  auction: any;
  listing: any;
  activeTab: string = 'addmnf';
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
    this.createMnfDtl();
  }

  createMnfDtl() {
    this.route.queryParamMap.subscribe((data) => {
      const tab = data.get('tab');
      if (tab) {
        this.activeTab = tab;  
      }
      this.loading = false;
    });
  }

  changeTab(tab) {
    this.activeTab = tab;
  }
  
}
