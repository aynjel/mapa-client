import { Component, effect, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatSuffix } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { AuthStore } from '../../auth.store';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSuffix,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  public authStore = inject(AuthStore);
  private router: Router = inject(Router);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private snackbar: MatSnackBar = inject(MatSnackBar);

  registerForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  user$ = toObservable(this.authStore.user);

  constructor() {
    effect(() => {
      if (this.authStore.isSubmitted()) {
        this.router.navigate(['/auth/login']).then(() => {
          this.registerForm.reset();
          this.authStore.reset();
        });
      }
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.snackbar.open('Invalid form', 'Close', {
        duration: 2000,
      });
      return;
    }

    this.authStore.register(this.registerForm.value);
  }
}
