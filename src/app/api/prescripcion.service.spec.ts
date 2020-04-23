import { TestBed } from '@angular/core/testing';

import { PrescripcionService } from './prescripcion.service';

describe('PrescripcionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrescripcionService = TestBed.get(PrescripcionService);
    expect(service).toBeTruthy();
  });
});
