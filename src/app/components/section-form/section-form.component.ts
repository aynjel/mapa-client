import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SectionService } from '../../shared/services/section.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { Section } from '../../shared/types/section.types';

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrl: './section-form.component.scss',
})
export class SectionFormComponent implements OnInit {
  sectionForm!: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private sectionService: SectionService,
    private dialog: MatDialogRef<SectionFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Section
  ) {
    this.sectionForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.sectionForm.patchValue(this.data);
    }
  }

  onSubmit() {
    this.isLoading = true;

    if (this.sectionForm.valid) {
      this.sectionForm.disable();

      if (this.data) {
        this.sectionService
          .updateSection(this.data, this.sectionForm.value)
          .pipe(
            finalize(() => {
              this.isLoading = false;
              this.sectionForm.enable();
            })
          )
          .subscribe({
            next: (res) => {
              this.dialog.close(res.data);
              this.snackBar.open(res.message, 'Close', {
                duration: 3000,
              });
            },
          });
      } else {
        this.sectionService
          .createSection(this.sectionForm.value)
          .pipe(
            finalize(() => {
              this.isLoading = false;
              this.sectionForm.enable();
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
              this.snackBar.open(
                error.error.message || error.message,
                'Close',
                {
                  duration: 3000,
                }
              );
            },
          });
      }
    } else {
      this.snackBar.open('Form is invalid', 'Close', {
        duration: 3000,
      });
      this.isLoading = false;
    }
  }
}
