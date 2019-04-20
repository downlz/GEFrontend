import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionListingCardComponent } from './auction-listing-card.component';

describe('AuctionListingCardComponent', () => {
  let component: AuctionListingCardComponent;
  let fixture: ComponentFixture<AuctionListingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionListingCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionListingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
