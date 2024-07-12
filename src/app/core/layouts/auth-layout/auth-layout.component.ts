import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
  private router = inject(Router);
  private authStore = inject(AuthStore);
  private cookieService = inject(CookieService);
  private snackbar = inject(MatSnackBar);

  constructor() {
    effect(() => {
      if (this.authStore.message()) {
        this.snackbar.open(this.authStore.message(), 'Close', {
          duration: 2000,
        });
      }
    });
    
    if (this.cookieService.check('token')) {
      this.authStore.setCurrentUser();
      this.router.navigate(['/user/section']);
    } else {
      this.authStore.reset();
    }
  }
}
