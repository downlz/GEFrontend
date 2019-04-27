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
import {AuthService} from '../../services/auth.service';
import {AuctionService} from '../../services/auction.service';


@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.scss']
})
export class CreateAuctionComponent implements OnInit {
  form: FormGroup;
  seller: any;
  itemnames: any;
  categories: any;
  units: any;
  sellers: any;
  buyers: any;
  listings: any;
  role: string;
  submitted: boolean;
  loading: boolean;

  constructor(private categoryService: CategoryService,
              private itemnameService: ItemnameService,
              private unitService: UnitService,
              private sellerService: UsersellerService,
              private buyerService: BuyerService,
              private listingService: ListingService,
              private auth: AuthService,
              private auctionService: AuctionService,
              private router: Router
  ) {
    this.initializeForm();
  }

  initializeForm() {
    const role = this.auth.getRole();
    this.role = role;
    let controls: any = {
      sampleNo: new FormControl('', [
        Validators.required,
      ]),
      availableQty: new FormControl(0, [
        Validators.required,
      ]),
      minQty: new FormControl(0, [
        Validators.required,
      ]),
      maxQty: new FormControl(0, [
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
      // seller: new FormControl(null),

      transportCost: new FormControl(0, [
        Validators.required,
      ])
    };
    if (role === 'admin') {
      controls = {
        auctionType: new FormControl('seller', [
          Validators.required,
        ]),
        itemName: new FormControl('', [
          Validators.required,
        ]),
        itemCategory: new FormControl('', [
          Validators.required,
        ]),
        buyer: new FormControl(''),
        ...controls
      };
    }
    this.form = new FormGroup({
      newItem: new FormGroup(controls)
    });
  }

  ngOnInit() {
    if (this.role === 'admin') {
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
    } else {
      forkJoin([this.unitService.getAll(), this.listingService.getCurrentUserListings()

      ])
        .subscribe(response => {
          this.units = response[0];
          this.listings = response[1];
        }, (error: Response) => {
          console.log(error);
        });
    }
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
      console.log(this.listings);
    }, (error: Response) => {
      console.log(error);
    });
  }

  onSampleNoChange() {
    const sample = this.form.get('newItem.sampleNo').value;
    const listing = this.listings.find((obj) => obj.id = sample);
    this.seller = listing.seller;
  }

  save(event) {
    this.submitted = true;
    event.preventDefault();
    if (this.form.valid) {
      const auction = this.form.getRawValue().newItem;
      auction.auctionType = auction.auctionType || 'seller';
      if (auction.auctionType === 'seller') {
        auction.user = this.seller._id;
      } else {
        auction.user = auction.buyer._id;
      }
      auction.nameVisible = !!auction.nameVisible;
      auction.transportCost = !!auction.transportCost;
      delete auction.buyer;
      delete auction.seller;
      this.loading = true;
      this.auctionService.create(auction).subscribe((response) => {
        this.loading = false;
        alert('Auction listed successfully');

      }, err => {
        this.loading = false;
        alert('There was a server error while listing this item for auction');
      });
    }
  }

  getErrors(name) {
    if (!this.form.controls.newItem['controls'][name]) {
      return {};
    } else {
      return this.form.controls.newItem['controls'][name].errors || {};
    }
  }
}
