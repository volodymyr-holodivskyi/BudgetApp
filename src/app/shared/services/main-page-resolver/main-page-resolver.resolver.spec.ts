import { TestBed } from '@angular/core/testing';

import { MainPageResolver } from './main-page-resolver.resolver';

describe('MainPageResolverResolver', () => {
  let resolver: MainPageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MainPageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
