import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Observable, of } from 'rxjs';
import { UserDataSource } from '../../shared/types/user.types';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user$: Observable<UserDataSource | null> = of(null);

  editForm!: FormGroup;
  isEditPassword = false;

  constructor(
    private authService: AuthService,
    private route: Router,
    private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.user$ = this.authService.current$;
  }

  onSubmitEdit() {
    console.log(this.editForm.value);
  }

  onLogout() {
    this.authService.logout().subscribe(() => {
      this.route.navigate(['/auth/signin']);
    });
  }
}
