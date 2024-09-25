import { TestBed } from '@angular/core/testing';

import { PdfExcelService } from './pdf-excel.service';

describe('PdfExcelService', () => {
  let service: PdfExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
