import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupBuyingComponent } from './group-buying.component';

describe('GroupBuyingComponent', () => {
  let component: GroupBuyingComponent;
  let fixture: ComponentFixture<GroupBuyingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupBuyingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupBuyingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
