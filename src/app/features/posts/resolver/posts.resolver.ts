import { ResolveFn } from '@angular/router';

export const postsResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
