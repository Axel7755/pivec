import { TestBed } from '@angular/core/testing';

import { GoogleAcademicoService } from './google-academico.service';

describe('GoogleAcademicoService', () => {
  let service: GoogleAcademicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleAcademicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
