import { Component, Input } from '@angular/core';
import { CurrentUserResponse, User } from '../../types/user.types';

type MenuItem = {
  icon: string;
  label: string;
  route: string;
};

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  @Input() collapsed: boolean = true;

  readonly menuItems: MenuItem[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'people', label: 'Users', route: '/users' },
    { icon: 'settings', label: 'Settings', route: '/settings' },
  ];

  user: CurrentUserResponse['data'] | null = null;

  constructor() {
    const userData = window.localStorage.getItem('user');
    const parsedData = JSON.parse(
      userData || '{}'
    ) as CurrentUserResponse['data'];

    if (parsedData) {
      this.user = parsedData;
    }
  }

  profilePicSize() {
    if (this.collapsed) {
      return '32';
    } else {
      return '100';
    }
  }

  logout(): void {
    console.log('Logout');
  }
}
