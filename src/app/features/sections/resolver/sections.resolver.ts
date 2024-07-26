import { ResolveFn } from '@angular/router';

export const sectionsResolver: ResolveFn<boolean> = (route, state) => {
  console.log('Log from sectionsResolver');

  return true;
};
