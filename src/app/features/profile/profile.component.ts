import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardAvatar, MatCardModule } from '@angular/material/card';
import { JsonPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserTypes } from '../../shared/types/User.types';
import { AuthStore } from '../../core/auth/auth.store';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [JsonPipe, MatCardModule, MatButtonModule, MatCardAvatar],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  private activatedRoute = inject(ActivatedRoute);
  authStore = inject(AuthStore);

  // user: UserTypes = this.activatedRoute.snapshot.data['user'];

  user = this.authStore.user();

  constructor() {
    // console.log('UserRessolve', this.user);
    // console.log('UserStore', this.authStore.user());
    // effect(() => {
    // });
  }
}
