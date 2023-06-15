import { TestBed } from '@angular/core/testing';

import { NavItemDataService } from './nav-item-data.service';

describe('NavItemDataService', () => {
  let service: NavItemDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavItemDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
