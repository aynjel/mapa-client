import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';
import { UserDataSource } from './shared/types/user.types';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'mapa';

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    this.authService.current$.subscribe((res) => {
      if (res) {
        this.route.navigate(['/dashboard']);
      }
    });
  }
}
