import { Component, Input, OnInit } from '@angular/core';
import { UserDataSource } from '../../types/user.types';
import { AuthService } from '../../services/auth.service';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  readonly menuItemsTeacher: MenuItem[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/mapa/dashboard' },
    {
      icon: 'announcement',
      label: 'Announcements',
      route: '/mapa/announcements',
    },
    {
      icon: 'book',
      label: 'Lessons',
      route: '/mapa/lessons',
    },
    { icon: 'people', label: 'Users', route: '/mapa/users' },
    // { icon: 'settings', label: 'Settings', route: '/settings' },
  ];

  readonly menuItemsPandS: MenuItem[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/mapa/dashboard' },
    {
      icon: 'announcement',
      label: 'Announcements',
      route: '/mapa/announcements',
    },
    {
      icon: 'book',
      label: 'Lessons',
      route: '/mapa/lessons',
    },
  ];

  user$: Observable<UserDataSource | null> = of(null);

  isLoggingOut: boolean = false;

  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) {}

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
    this.isLoggingOut = true;
    this.authService.logout().subscribe({
      next: (res) => {
        this.isLoggingOut = false;
        if (res) {
          this.snackbar.open(res.message, 'Close', {
            duration: 1500,
          });
          window.location.reload();
        }
      },
    });
  }
}
