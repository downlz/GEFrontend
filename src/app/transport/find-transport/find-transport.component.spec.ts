import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindTransportComponent } from './find-transport.component';

describe('FindTransportComponent', () => {
  let component: FindTransportComponent;
  let fixture: ComponentFixture<FindTransportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindTransportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
