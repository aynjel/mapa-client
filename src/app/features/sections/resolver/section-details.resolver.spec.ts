import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { sectionDetailsResolver } from './section-details.resolver';

describe('sectionDetailsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => sectionDetailsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
