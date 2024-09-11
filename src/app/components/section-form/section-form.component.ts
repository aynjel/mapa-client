import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SectionService } from '../../shared/services/section.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
      description: [''],
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.sectionService.createSection(this.sectionForm.value).subscribe({
      next: (res) => {
        this.dialog.close(res.data);
        this.snackBar.open('Section created successfully', 'Close', {
          duration: 3000,
        });
      },
      error: (error) => {
        console.log(error);
        this.snackBar
          .open(error.error.message || 'Something went wrong', 'Close', {
            duration: 3000,
          })
          .afterDismissed()
          .subscribe(() => {
            this.isLoading = false;
          });
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
