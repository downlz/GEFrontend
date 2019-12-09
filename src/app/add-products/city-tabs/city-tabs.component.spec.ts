import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityTabComponent } from './city-tabs.component';

describe('CityTabComponent', () => {
  let component: CityTabComponent;
  let fixture: ComponentFixture<CityTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
