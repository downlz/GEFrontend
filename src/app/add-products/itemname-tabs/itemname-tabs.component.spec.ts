import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemnameTabComponent } from './itemname-tabs.component';

describe('ItemnameTabComponent', () => {
  let component: ItemnameTabComponent;
  let fixture: ComponentFixture<ItemnameTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemnameTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemnameTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
