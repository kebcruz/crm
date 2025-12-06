import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstatuPage } from './estatu.page';

describe('EstatuPage', () => {
  let component: EstatuPage;
  let fixture: ComponentFixture<EstatuPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstatuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
