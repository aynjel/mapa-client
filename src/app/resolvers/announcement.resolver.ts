import { ResolveFn } from '@angular/router';

export const announcementResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
