import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LessonService } from '../../shared/services/lesson.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Section } from '../../shared/types/section.types';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-lesson-form',
  templateUrl: './lesson-form.component.html',
  styleUrl: './lesson-form.component.scss',
})
export class LessonFormComponent {
  lessonForm!: FormGroup;
  isLoading = false;

  fileName = '';
  content: any;

  constructor(
    private formBuilder: FormBuilder,
    private lessonService: LessonService,
    private dialog: MatDialogRef<LessonFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Section
  ) {
    this.lessonForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    const postFormData = new FormData();
    postFormData.append('title', this.lessonForm.value.title);
    postFormData.append('description', this.lessonForm.value.description);
    postFormData.append('content', this.content);

    this.isLoading = true;

    if (this.lessonForm.valid) {
      this.lessonService
        .createLesson(postFormData, this.data.slug)
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
            console.log(error);
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

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      this.content = file;
    }
  }
}
