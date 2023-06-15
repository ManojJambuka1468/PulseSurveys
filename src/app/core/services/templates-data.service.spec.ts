import { TestBed } from '@angular/core/testing';

import { TemplatesDataService } from './templates-data.service';

describe('TemplatesDataService', () => {
  let service: TemplatesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplatesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
