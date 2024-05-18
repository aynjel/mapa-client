import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Login</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-form-field>
          <mat-label>Username</mat-label>
          <input matInput placeholder="Username" />
        </mat-form-field>
        <mat-form-field>
          <mat-label>Password</mat-label>
          <input
            matInput
            placeholder="Password"
            [type]="isShowPassword ? 'text' : 'password'"
          />
          <mat-icon matSuffix (click)="toggleShowPassword()">
            {{ isShowPassword ? 'visibility' : 'visibility_off' }}
          </mat-icon>
        </mat-form-field>
        <mat-checkbox>Remember me</mat-checkbox>
        <button mat-raised-button color="primary">Login</button>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    mat-card {
      max-width: 400px;
      margin: 0 auto;
    }
    mat-card-header {
      justify-content: center;
      margin-bottom: 1rem;
    }
    mat-card-title {
      font-size: 1.5rem;
    }
    mat-card-content {
      display: flex;
      flex-direction: column;
    }
    mat-form-field {
      width: 100%;
    }
  `,
})
export class LoginComponent {
  isShowPassword = false;

  toggleShowPassword() {
    this.isShowPassword = !this.isShowPassword;
  }
}
