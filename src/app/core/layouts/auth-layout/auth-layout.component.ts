import { Component, effect, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent implements OnInit {
  private readonly store = inject(AuthStore);
  private readonly snackBar = inject(MatSnackBar);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  constructor() {
    effect(() => {
      if (this.store.isSubmitted() && this.store.message()) {
        this.snackBar.open(this.store.message(), 'Close', {
          duration: 3000,
        });
      }

      if (this.store.isLoggedIn()) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  ngOnInit(): void {
    if (this.cookieService.get('token')) {
      this.store.setCurrentUser();
    }
  }
}
