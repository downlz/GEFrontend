import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchOrderComponent } from './dispatch-order.component';

describe('DispatchOrderComponent', () => {
  let component: DispatchOrderComponent;
  let fixture: ComponentFixture<DispatchOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
