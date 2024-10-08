import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private route: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  onSubmit() {
    this.isLoading = true;
    if (this.loginForm.valid) {
      this.loginForm.disable();
      this.authService
        .login(this.loginForm.value)
        .pipe(
          finalize(() => {
            this.isLoading = false;
            this.loginForm.enable();
          })
        )
        .subscribe({
          next: (res) => {
            this.snackBar
              .open(res.message, 'Close', {
                duration: 1500,
              })
              .afterDismissed()
              .subscribe(() => {
                this.route.navigate(['/mapa']);
              });
          },
          error: (error) => {
            console.log(error);
            this.snackBar.open(error.error.message || error.message, 'Close', {
              duration: 3000,
            });
          },
        });
    } else {
      this.snackBar
        .open('Please fill in all required fields', 'Close', {
          duration: 1500,
        })
        .afterDismissed()
        .subscribe(() => {
          this.isLoading = false;
          this.loginForm.enable();
        });
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);

    if (control?.hasError('required')) {
      return 'This field is required';
    }

    return control?.hasError('email') ? 'Not a valid email' : '';
  }
}
