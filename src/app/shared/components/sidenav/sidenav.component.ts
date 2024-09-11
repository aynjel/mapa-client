import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  CurrentUserResponse,
  User,
  UserDataSource,
} from '../../types/user.types';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

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
export class SidenavComponent implements OnInit {
  @Input() collapsed: boolean = true;

  readonly menuItems: MenuItem[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'announcement', label: 'Announcements', route: '/announcements' },
    { icon: 'people', label: 'Users', route: '/users' },
    { icon: 'settings', label: 'Settings', route: '/settings' },
  ];

  user$: Observable<UserDataSource | null> = of(null);

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    this.user$ = this.authService.current$;
  }

  profilePicSize() {
    if (this.collapsed) {
      return '32';
    } else {
      return '100';
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (res) => {
        if (res) {
          this.route.navigate(['/auth/signin']);
        }
      },
    });
  }
}
