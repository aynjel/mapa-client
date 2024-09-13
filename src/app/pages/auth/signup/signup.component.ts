import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  registerForm!: FormGroup;
  isLoading = false;

  protected readonly roles: string[] = ['parent', 'teacher', 'student'];
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private route: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
    });

    this.registerForm
      .get('confirmPassword')
      ?.valueChanges.subscribe(this.validatePasswords);
  }

  onSubmit() {
    this.isLoading = true;
    this.registerForm.disable();

    const { name, email, password, role } = this.registerForm.value;
    if (this.registerForm.valid) {
      this.authService
        .register({
          name,
          email,
          password,
          role,
        })
        .subscribe({
          next: (res) => {
            this.snackBar
              .open(res.message, 'Close', {
                duration: 1500,
              })
              .afterDismissed()
              .subscribe(() => {
                this.route.navigate(['/auth/signin']);
              });
          },
          error: (error) => {
            this.snackBar
              .open(error.error.message || error.message, 'Close', {
                duration: 3000,
              })
              .afterDismissed()
              .subscribe(() => {
                this.isLoading = false;
                this.registerForm.enable();
              });
          },
          complete: () => {
            this.isLoading = false;
            this.registerForm.enable();
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
          this.registerForm.enable();
        });
    }
  }

  private validatePasswords = (password: string) => {
    const passwordControl = this.registerForm.get('password');
    const confirmPasswordControl = this.registerForm.get('confirmPassword');

    if (passwordControl?.value === password) {
      passwordControl?.setErrors(null);
      confirmPasswordControl?.setErrors(null);
    } else {
      passwordControl?.setErrors({ notMatch: true });
      confirmPasswordControl?.setErrors({ notMatch: true });
    }
  };

  getErrorMessage(controlName: string) {
    const ctrlName = this.registerForm.get(controlName);

    if (ctrlName?.hasError('notMatch')) {
      return 'Password does not match';
    }
    if (ctrlName?.hasError('required')) {
      return 'Required field';
    }
    if (ctrlName?.hasError('minlength')) {
      return 'Password must be at least 6 characters';
    }
    if (ctrlName?.hasError('email')) {
      return 'Not a valid email';
    }

    return '';
  }
}
