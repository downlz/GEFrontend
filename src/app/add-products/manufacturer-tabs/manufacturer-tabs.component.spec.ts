import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerTabComponent } from './manufacturer-tabs.component';

describe('ManufacturerTabComponent', () => {
  let component: ManufacturerTabComponent;
  let fixture: ComponentFixture<ManufacturerTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturerTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
