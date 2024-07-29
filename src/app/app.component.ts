import { Component, effect, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterOutlet } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';

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

  constructor() {
    this.authStore.setCurrentUser();
    effect(() => {
      if (this.authStore.message()) {
        this.snackBar.open(this.authStore.message(), 'Close', {
          duration: 3000,
        });
      }

      if (this.authStore.isLoggedIn()) {
        this.authStore.setCurrentUser();
      }
    });
  }
}
