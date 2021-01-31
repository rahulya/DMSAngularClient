import { TestBed } from '@angular/core/testing';

import { ApiUserModuleService } from './api-user-module.service';

describe('ApiUserModuleService', () => {
  let service: ApiUserModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiUserModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
