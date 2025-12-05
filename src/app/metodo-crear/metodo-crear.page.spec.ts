import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetodoCrearPage } from './metodo-crear.page';

describe('MetodoCrearPage', () => {
  let component: MetodoCrearPage;
  let fixture: ComponentFixture<MetodoCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MetodoCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
