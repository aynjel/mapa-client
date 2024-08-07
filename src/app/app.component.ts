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

  title = 'Mapa';

  constructor() {
    this.initializeApp();

    effect(() => {
      if (this.authStore.message()) {
        this.snackBar.open(this.authStore.message(), 'Close', {
          duration: 3000,
        });
      }

      if (this.authStore.user()) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  private initializeApp() {
    this.authStore.setCurrentUser();
  }
}
