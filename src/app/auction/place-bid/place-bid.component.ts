import {AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {BidService} from '../../services/bid.service';
import {AuthService} from '../../services/auth.service';
import {ManufacturerService} from '../../services/manufacturer.service';

@Component({
  selector: 'app-place-bid',
  templateUrl: './place-bid.component.html',
  styleUrls: ['./place-bid.component.scss']
})
export class PlaceBidComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  @Input()
  modal: any;
  @Input()
  auction: any;
  loading: boolean;
  submitted: boolean;
  @ViewChild('quantity')
  quantity: ElementRef;
  role: string;
  showMarketingExpense: Boolean = false;
  manufacturerNotPresent: Boolean = false;
  manufacturers: Array<any> = [];

  constructor(private authService: AuthService, private modalService: NgbModal, private bidService: BidService, private manufacturerService: ManufacturerService) {
    this.role = this.authService.getRole();
  }

  ngOnInit() {
    this.manufacturerService.getAll().subscribe((data: any) => {
      this.manufacturers = data;
    });
    if (this.auction) {
      if (this.role === 'seller') {
        this.form = new FormGroup({
          newItem: new FormGroup({
            price: new FormControl('', [
              Validators.required,
              (control: AbstractControl) => Validators.max(this.auction.floorPrice)(control),
            ]),
            marketingExpense: new FormControl(0, [
              // (control: AbstractControl) => this.showMarketingExpense ? Validators.required(control) : null,
              (control: AbstractControl) => Validators.min(1)(control),
              (control: AbstractControl) => Validators.max(100)(control)
            ]),
            manufacturer: new FormControl('', [
              //Validators.required
            ])
          })
        });
      } else {
        this.form = new FormGroup({
          newItem: new FormGroup({
            price: new FormControl('', [
              Validators.required,
              (control: AbstractControl) => Validators.min(this.auction.floorPrice)(control),
              (control: AbstractControl) => Validators.max(this.auction.ceilingPrice)(control)
            ]),
            quantity: new FormControl('', [
              Validators.required,
              (control: AbstractControl) => Validators.min(this.auction.minQty)(control),
              (control: AbstractControl) => Validators.max(this.auction.maxQty)(control)
            ])
          })
        });
      }
    }
  }

  ngAfterViewInit() {
    if (this.quantity) {
      setTimeout(() => this.quantity.nativeElement.focus());
    }
  }

  save(event) {
    this.submitted = true;
    event.preventDefault();
    if (this.form.valid) {
      this.loading = true;
      const bid = this.form.getRawValue().newItem;
      bid.auction = this.auction._id;
      this.bidService.create(bid).subscribe((response) => {
          this.loading = false;
        alert('Bid Placed successfully');
        this.modal.close();
      }, err => {
        this.loading = false;
        alert('There was a server error while bidding on this auction');
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
