import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';

@Component({
  selector: 'app-no-sidebar-layout',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './no-sidebar-layout.component.html',
  styleUrl: './no-sidebar-layout.component.scss',
})
export class NoSidebarLayoutComponent {
  private readonly authStore = inject(AuthStore);
  protected readonly titleService = inject(Title);

  back() {
    window.history.back();
  }

  logout() {
    this.authStore.logout();
    setTimeout(() => window.location.reload(), 1000);
  }
}
