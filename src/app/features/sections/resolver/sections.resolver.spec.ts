import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { sectionsResolver } from './sections.resolver';

describe('sectionsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => sectionsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
