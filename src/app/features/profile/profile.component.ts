import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardAvatar, MatCardModule } from '@angular/material/card';
import { JsonPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserTypes } from '../../shared/types/User.types';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [JsonPipe, MatCardModule, MatButtonModule, MatCardAvatar],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  private activatedRoute = inject(ActivatedRoute);

  user: UserTypes = this.activatedRoute.snapshot.data['user'];

  constructor() {
    console.log('User', this.user);
  }
}
