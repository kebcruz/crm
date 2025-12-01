import { TestBed } from '@angular/core/testing';

import { Estatu } from './estatu';

describe('Estatu', () => {
  let service: Estatu;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Estatu);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
