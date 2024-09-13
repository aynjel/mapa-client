import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent implements OnInit {
  protected readonly logo = 'mapa-logo.jpg';

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    this.authService.current$.subscribe((user) => {
      if (user) {
        this.route.navigate(['/mapa']);
      }
    });
  }
}
