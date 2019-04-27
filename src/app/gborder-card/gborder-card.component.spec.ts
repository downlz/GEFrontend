import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GBOrderCardComponent } from './gborder-card.component';

describe('GBOrderCardComponent', () => {
  let component: GBOrderCardComponent;
  let fixture: ComponentFixture<GBOrderCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GBOrderCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GBOrderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
