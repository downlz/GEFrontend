import {Component, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-place-bid',
  templateUrl: './place-bid.component.html',
  styleUrls: ['./place-bid.component.scss']
})
export class PlaceBidComponent implements OnInit {
  form: FormGroup;
  @Input()
  modal: any;
  @Input()
  auction: any;
  loading: boolean;
  submitted: boolean;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
    if (this.auction) {
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
          ]),
        })
      });
    }
  }


  save(event) {
    this.submitted = true;
    event.preventDefault();
    if (this.form.valid) {
      this.loading = true;
      const bid = this.form.getRawValue().newItem;
      this.modal.close();
      console.log(bid);
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
