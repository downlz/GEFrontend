import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBargainSpecifierComponnent } from './product-bargain-list.component';

describe('ProductBargainSpecifierComponnent', () => {
  let component: ProductBargainSpecifierComponnent;
  let fixture: ComponentFixture<ProductBargainSpecifierComponnent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductBargainSpecifierComponnent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBargainSpecifierComponnent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
