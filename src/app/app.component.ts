import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const userDataString = localStorage.getItem('user');
    if (!userDataString) return;
    this.authService.getCurrentUser().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        console.log(error);
        localStorage.removeItem('user');
        // this.authService.logout();
      },
    });
  }
}
