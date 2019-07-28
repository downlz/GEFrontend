import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BargainQuoteComponent } from './bargain-quote.component';

describe('BargainQuoteComponent', () => {
  let component: BargainQuoteComponent;
  let fixture: ComponentFixture<BargainQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BargainQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BargainQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
