import { TestBed } from '@angular/core/testing';

import { GruposAlumnosService } from './grupos-alumnos.service';

describe('GruposAlumnosService', () => {
  let service: GruposAlumnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GruposAlumnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
