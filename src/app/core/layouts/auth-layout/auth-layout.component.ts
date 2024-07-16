import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStore } from '../../auth/auth.store';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, MatSnackBarModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {
  private authStore = inject(AuthStore);
  private snackbar = inject(MatSnackBar);

  constructor() {
    effect(() => {
      if (this.authStore.message()) {
        this.snackbar.open(this.authStore.message(), 'Close', {
          duration: 2000,
        });
      }
    });
  }
}
