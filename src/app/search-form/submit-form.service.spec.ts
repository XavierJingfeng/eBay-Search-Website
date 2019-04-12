import { TestBed } from '@angular/core/testing';

import { SubmitFormService } from './submit-form.service';

describe('SubmitFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubmitFormService = TestBed.get(SubmitFormService);
    expect(service).toBeTruthy();
  });
});
