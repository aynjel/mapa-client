import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AuthStore } from './core/auth/auth.store';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet],
})
export class AppComponent {
  private router = inject(Router);
  private authStore = inject(AuthStore);

  constructor() {
    effect(() => {
      if (this.authStore.isLoggedIn()) {
        this.authStore.setCurrentUser();
        this.router.navigate(['/profile']);
      }
    });
  }
}
