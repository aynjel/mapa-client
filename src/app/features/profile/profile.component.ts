import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  protected readonly authStore = inject(AuthStore);

  ngOnInit(): void {
    console.log(this.authStore.user());
  }
}
