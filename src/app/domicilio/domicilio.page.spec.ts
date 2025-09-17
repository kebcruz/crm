import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomicilioPage } from './domicilio.page';

describe('DomicilioPage', () => {
  let component: DomicilioPage;
  let fixture: ComponentFixture<DomicilioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DomicilioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
