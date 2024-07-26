import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';

type MenuItem = {
  icon: string;
  label: string;
  route: string;
};

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    MatListModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit {
  protected readonly authStore = inject(AuthStore);

  collapsed = input.required<boolean>();

  profilePicSize = computed(() => (this.collapsed() ? '32' : '100'));

  menuItems = signal<MenuItem[]>([
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'people', label: 'Users', route: '/users' },
    { icon: 'settings', label: 'Settings', route: '/settings' },
  ]);

  ngOnInit(): void {
    console.log(this.authStore.user());
  }

  logout(): void {
    console.log('Logout');
  }
}
