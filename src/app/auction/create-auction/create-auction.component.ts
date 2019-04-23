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
import {ListingService} from '../../services/listing.service';


@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.scss']
})
export class CreateAuctionComponent implements OnInit {

  form = new FormGroup({
    newItem: new FormGroup({
      itemName: new FormControl('', [
        Validators.required,
      ]),
      itemCategory: new FormControl('', [
        Validators.required,
      ]),
      sampleNo: new FormControl('', [
        Validators.required,
      ]),
      auctionType: new FormControl('seller', [
        Validators.required,
      ]),
      availableQty: new FormControl('', [
        Validators.required,
      ]),
      minQty: new FormControl('', [
        Validators.required,
      ]),
      maxQty: new FormControl('', [
        Validators.required,
      ]),
      unit: new FormControl('', [
        Validators.required
      ]),
      floorPrice: new FormControl('', [
        Validators.required,
      ]),
      ceilingPrice: new FormControl('', [
        Validators.required,
      ]),
      nameVisible: new FormControl(1, [
        Validators.required,
      ]),
      startTime: new FormControl(new Date(), [
        Validators.required,
      ]),
      endTime: new FormControl(new Date(), [
        Validators.required,
      ]),
      seller: new FormControl(''),
      buyer: new FormControl(''),
      transportCost: new FormControl(1, [
        Validators.required,
      ])
    })
  });
  itemnames: any;
  categories: any;
  units: any;
  sellers: any;
  buyers: any;
  listings: any;

  constructor(private categoryService: CategoryService,
              private itemnameService: ItemnameService,
              private unitService: UnitService,
              private sellerService: UsersellerService,
              private buyerService: BuyerService,
              private listingService: ListingService,
              private router: Router
  ) {

  }

  ngOnInit() {
    console.log(this.form.value.newItem)
    forkJoin([this.itemnameService.getAll(), this.unitService.getAll(), this.sellerService.getAll(), this.buyerService.getAll(),

    ])
      .subscribe(response => {
        this.itemnames = response[0];
        this.units = response[1];
        this.sellers = response[2];
        this.buyers = response[3];
      }, (error: Response) => {
        console.log(error);
      });
  }

  onItemChange(datain2) {
    let item = this.form.get('newItem.itemName').value;
    this.categories = [];
    this.listings = [];
    this.categoryService.getCategoriesByItem(item).subscribe((response) => {
      this.categories = response;
    }, (error: Response) => {
      console.log(error);
    });

  }

  onCategoryChange(datain) {
    this.listings = [];
    let category = this.form.get('newItem.itemCategory').value;
    this.listingService.getListingsByCategory(category).subscribe((response) => {
      this.listings = response;
    }, (error: Response) => {
      console.log(error);
    });
  }

  save(event) {
    event.preventDefault();
  }
}
