import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BargainOrderComponent } from './bargain-order.component';

describe('BargainOrderComponent', () => {
  let component: BargainOrderComponent;
  let fixture: ComponentFixture<BargainOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BargainOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BargainOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
