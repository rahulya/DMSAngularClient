import { TestBed } from '@angular/core/testing';

import { ApiGroupModuleService } from './api-group-module.service';

describe('ApiGroupModuleService', () => {
  let service: ApiGroupModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiGroupModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
