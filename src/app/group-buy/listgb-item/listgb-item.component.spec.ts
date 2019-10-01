import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGBItemComponent } from './listgb-item.component';

describe('ListGBItemComponent', () => {
  let component: ListGBItemComponent;
  let fixture: ComponentFixture<ListGBItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGBItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGBItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
