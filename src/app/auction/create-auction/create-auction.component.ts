import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {CategoryService} from '../../services/category.service';
import {ItemnameService} from '../../services/itemname.service';
import {Router} from '@angular/router';
import {forkJoin} from 'rxjs';
import {UnitService} from '../../services/unit.service';
import {UserService} from '../../services/user.service';
import {UsersellerService} from '../../services/seller.service';
import {BuyerService} from '../../services/buyer.service';


@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.scss']
})
export class CreateAuctionComponent implements OnInit {

  form = new FormGroup({
    newItem: new FormGroup({
      itemName: new FormControl(''),
      itemCategory: new FormControl(''),
      sampleNo: new FormControl(''),
      auctionType: new FormControl('seller'),
      availableQty: new FormControl,
      minQty: new FormControl,
      maxQty: new FormControl,
      unit: new FormControl(''),
      floorPrice: new FormControl,
      ceilingPrice: new FormControl,
      nameVisible: new FormControl(1),
      startTime: new FormControl,
      endTime: new FormControl,
      seller: new FormControl(''),
      buyer: new FormControl(''),
      transportCost: new FormControl(1)
    })
  });
  itemnames: any;
  categories: any;
  units: any;
  sellers: any;
  buyers: any;

  constructor(private categoryService: CategoryService,
              private itemnameService: ItemnameService,
              private unitService: UnitService,
              private sellerService: UsersellerService,
              private buyerService: BuyerService,
              private router: Router
  ) {

  }

  ngOnInit() {

    forkJoin([this.itemnameService.getAll(), this.categoryService.getAll(), this.unitService.getAll(), this.sellerService.getAll(), this.buyerService.getAll()])
      .subscribe(response => {
        this.categories = response[0];
        this.itemnames = response[1];
        this.units = response[2];
        this.sellers = response[3];
        this.buyers = response[4];
      }, (error: Response) => {
        console.log(error);
      });
  }

}
