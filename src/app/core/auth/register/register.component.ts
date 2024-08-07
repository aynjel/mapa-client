import { Component, effect, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthStore } from '../auth.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  protected readonly authStore = inject(AuthStore);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  registerForm!: FormGroup;

  constructor() {
    this.initializeForm();

    effect(() => {
      if (this.authStore.isLoading()) {
        this.registerForm.disable();
      } else {
        this.registerForm.enable();
      }

      if (this.authStore.user()) {
        this.router.navigate(['/login']).then(() => {
          this.registerForm.reset();
          this.authStore.resetState();
        });
      }

      if (this.authStore.isLoggedIn()) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  private initializeForm() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });

    this.registerForm
      .get('confirmPassword')
      ?.valueChanges.subscribe(this.validatePasswords);
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
      return 'You must enter a value';
    }
    return ctrlName?.hasError('email') ? 'Not a valid email' : null;
  }

  onSubmit() {
    const { name, email, password } = this.registerForm.value;
    this.authStore.register({ name, email, password });
  }
}
