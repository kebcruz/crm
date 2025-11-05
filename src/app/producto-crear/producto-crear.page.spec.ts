import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoCrearPage } from './producto-crear.page';

describe('ProductoCrearPage', () => {
  let component: ProductoCrearPage;
  let fixture: ComponentFixture<ProductoCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
