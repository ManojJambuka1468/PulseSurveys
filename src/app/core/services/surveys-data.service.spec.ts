import { TestBed } from '@angular/core/testing';

import { SurveysDataService } from './surveys-data.service';

describe('SurveysDataService', () => {
  let service: SurveysDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveysDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
