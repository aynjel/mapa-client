import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatToolbarModule, MatButtonModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  constructor() {
    effect(() => {
      if (this.authStore.isSubmitted() && this.authStore.isLoggedIn()) {
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
