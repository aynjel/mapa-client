import { Component, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterOutlet } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSnackBarModule],
  template: `<router-outlet />`,
})
export class AppComponent {
  private readonly authStore = inject(AuthStore);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);

  protected readonly isLoggedIn$ = toObservable(this.authStore.isLoggedIn);
  private readonly message$ = toObservable(this.authStore.message);

  constructor() {
    this.authStore.setCurrentUser();

    this.message$.subscribe((message) => {
      if (message) {
        this.snackBar.open(message, 'Close', {
          duration: 3000,
        });
      }
    });

    this.isLoggedIn$.subscribe({
      next: (isLoggedIn) => {
        console.log('isLoggedIn', isLoggedIn);

        if (!isLoggedIn) {
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
    });
  }
}
