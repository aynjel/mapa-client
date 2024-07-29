import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Title } from '@angular/platform-browser';
import { Router, RouterOutlet } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-no-sidebar-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  templateUrl: './no-sidebar-layout.component.html',
  styleUrl: './no-sidebar-layout.component.scss',
})
export class NoSidebarLayoutComponent {
  private readonly authStore = inject(AuthStore);
  protected readonly titleService = inject(Title);
  private readonly router = inject(Router);

  back() {
    window.history.back();
  }

  logout() {
    this.authStore.logout();
    if (!this.authStore.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
}
