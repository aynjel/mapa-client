import { Component, effect, inject } from '@angular/core';
import { NgIf, TitleCasePipe } from '@angular/common';
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
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgIf,
    TitleCasePipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatRadioModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  protected readonly authStore = inject(AuthStore);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  private user$ = toObservable(this.authStore.user);

  registerForm!: FormGroup;

  roles: string[] = ['parent', 'teacher', 'student'];
  constructor() {
    this.initializeForm();

    effect(() => {
      if (this.authStore.isLoading()) {
        this.registerForm.disable();
      } else {
        this.registerForm.enable();
      }
    });
  }

  private initializeForm() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
      role: ['', [Validators.required]],
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
    if (this.registerForm.valid) {
      const { name, email, password, role } = this.registerForm.value;
      this.authStore.register({ name, email, password, role });

      this.user$.subscribe({
        next: (user) => {
          if (user) {
            this.router.navigate(['/login']).then(() => {
              this.authStore.resetState();
            });
          }
        },
      });
    }
  }
}
