import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'mapa';

  constructor(private authService: AuthService, private route: Router) {
    if (window.localStorage.getItem('token')) {
      this.authService.getCurrentUser().subscribe({
        next: (res) => {
          window.localStorage.setItem('user', JSON.stringify(res.data));
          this.route.navigate(['/dashboard']);
        },
      });
    } else {
      this.route.navigate(['/auth/signin']);
    }
  }
}
