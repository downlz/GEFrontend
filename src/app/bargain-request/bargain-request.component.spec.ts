import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BargainRequestComponent } from './bargain-request.component';

describe('BargainRequestComponent', () => {
  let component: BargainRequestComponent;
  let fixture: ComponentFixture<BargainRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BargainRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BargainRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
