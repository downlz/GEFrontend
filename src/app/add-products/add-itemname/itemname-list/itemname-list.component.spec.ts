import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemnameListComponent } from './itemname-list.component';

describe('ItemnameListComponent', () => {
  let component: ItemnameListComponent;
  let fixture: ComponentFixture<ItemnameListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemnameListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemnameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
