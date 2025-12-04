import { TestBed } from '@angular/core/testing';

import { ProductoEtiqueta } from './producto-etiqueta';

describe('ProductoEtiqueta', () => {
  let service: ProductoEtiqueta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoEtiqueta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
