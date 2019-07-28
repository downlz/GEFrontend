import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportRateComponent } from './transport-rate.component';

describe('TransportRateComponent', () => {
  let component: TransportRateComponent;
  let fixture: ComponentFixture<TransportRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
