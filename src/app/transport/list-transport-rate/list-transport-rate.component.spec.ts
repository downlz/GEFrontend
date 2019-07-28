import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTransportRateComponent } from './list-transport-rate.component';

describe('ListTransportRateComponent', () => {
  let component: ListTransportRateComponent;
  let fixture: ComponentFixture<ListTransportRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTransportRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTransportRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
