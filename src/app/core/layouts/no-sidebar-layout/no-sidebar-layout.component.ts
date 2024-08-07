import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-no-sidebar-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './no-sidebar-layout.component.html',
  styleUrl: './no-sidebar-layout.component.scss',
})
export class NoSidebarLayoutComponent {
  protected readonly authStore = inject(AuthStore);
  protected readonly titleService = inject(Title);

  back() {
    window.history.back();
  }

  logout() {
    if (this.authStore.isLoggedIn()) {
      this.authStore.logout();

      // window.location.reload();
    }
  }
}
