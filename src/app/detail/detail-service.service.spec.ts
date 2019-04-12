import { TestBed } from '@angular/core/testing';

import { DetailServiceService } from './detail-service.service';

describe('DetailServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetailServiceService = TestBed.get(DetailServiceService);
    expect(service).toBeTruthy();
  });
});
