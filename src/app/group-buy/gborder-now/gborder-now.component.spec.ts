import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GBOrderNowComponent } from './gborder-now.component';

describe('GBOrderNowComponent', () => {
  let component: GBOrderNowComponent;
  let fixture: ComponentFixture<GBOrderNowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GBOrderNowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GBOrderNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
