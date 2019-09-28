import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GBListingCardComponent } from './gblisting-card.component';

describe('GBListingCardComponent', () => {
  let component: GBListingCardComponent;
  let fixture: ComponentFixture<GBListingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GBListingCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GBListingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
