import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstatuCrearPage } from './estatu-crear.page';

describe('EstatuCrearPage', () => {
  let component: EstatuCrearPage;
  let fixture: ComponentFixture<EstatuCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstatuCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
