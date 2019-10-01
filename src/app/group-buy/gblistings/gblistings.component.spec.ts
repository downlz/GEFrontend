import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GBListingsComponent } from './gblistings.component';

describe('GBListingsComponent', () => {
  let component: GBListingsComponent;
  let fixture: ComponentFixture<GBListingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GBListingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GBListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
