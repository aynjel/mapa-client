import { Component, effect, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthStore } from './core/auth/auth.store';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
  private authStore = inject(AuthStore);
  private router = inject(Router);
  private cookieService = inject(CookieService);

  constructor() {
    effect(() => {
      console.log('AppComponent', this.authStore.user());
    });
  }

  ngOnInit() {
    if (this.cookieService.check('token') && !this.authStore.user()) {
      this.authStore.setCurrentUser();
    }
  }
}
