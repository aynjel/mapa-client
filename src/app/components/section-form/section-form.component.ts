import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SectionService } from '../../shared/services/section.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrl: './section-form.component.scss',
})
export class SectionFormComponent {
  sectionForm!: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private sectionService: SectionService,
    private dialog: MatDialogRef<SectionFormComponent>,
    private snackBar: MatSnackBar
  ) {
    this.sectionForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isLoading = true;
    if (this.sectionForm.valid) {
      this.sectionService
        .createSection(this.sectionForm.value)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe({
          next: (res) => {
            this.dialog.close(res.data);
            this.snackBar.open(res.message, 'Close', {
              duration: 3000,
            });
          },
          error: (error) => {
            console.error(error);
            this.snackBar.open(error.error.message || error.message, 'Close', {
              duration: 3000,
            });
          },
        });
    } else {
      this.snackBar.open('Form is invalid', 'Close', {
        duration: 3000,
      });
      this.isLoading = false;
    }
  }
}
