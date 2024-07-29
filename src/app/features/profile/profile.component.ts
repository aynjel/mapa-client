import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';
import { MatChipsModule } from '@angular/material/chips';

type NavItem = { title: string; link: string };

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, MatCardModule, MatButtonModule, MatChipsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  protected readonly authStore = inject(AuthStore);
}
