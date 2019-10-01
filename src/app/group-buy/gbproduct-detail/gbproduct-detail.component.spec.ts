import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GBProductDetailComponent } from './gbproduct-detail.component';

describe('GBProductDetailComponent', () => {
  let component: GBProductDetailComponent;
  let fixture: ComponentFixture<GBProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GBProductDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GBProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
