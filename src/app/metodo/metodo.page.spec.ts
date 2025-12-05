import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetodoPage } from './metodo.page';

describe('MetodoPage', () => {
  let component: MetodoPage;
  let fixture: ComponentFixture<MetodoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MetodoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
