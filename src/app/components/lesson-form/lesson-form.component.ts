import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LessonService } from '../../shared/services/lesson.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { Lesson } from '../../shared/types/lesson.types';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lesson-form',
  templateUrl: './lesson-form.component.html',
  styleUrl: './lesson-form.component.scss',
})
export class LessonFormComponent implements OnInit {
  lessonForm!: FormGroup;
  isLoading = false;

  fileName = '';
  content: any;

  constructor(
    private formBuilder: FormBuilder,
    private lessonService: LessonService,
    private dialog: MatDialogRef<LessonFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private activatedRoute: ActivatedRoute
  ) {
    this.lessonForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.lesson) {
      this.lessonForm.patchValue(this.data.lesson);
    }
  }

  onSubmit() {
    this.isLoading = true;

    const postFormData = new FormData();
    postFormData.append('title', this.lessonForm.value.title);
    postFormData.append('description', this.lessonForm.value.description);
    postFormData.append('content', this.content);

    if (this.lessonForm.valid) {
      this.lessonForm.disable();

      if (this.data.lesson) {
        this.lessonService
          .updateLesson(this.data.lesson, postFormData)
          .pipe(
            finalize(() => {
              this.isLoading = false;
              this.lessonForm.enable();
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

      if (this.data.sectionSlug) {
        this.lessonService
          .createLesson(postFormData, this.data.sectionSlug)
          .subscribe({
            next: (res) => {
              this.dialog.close(res.data);
              this.snackBar.open(res.message, 'Close', {
                duration: 3000,
              });
            },
            error: (error) => {
              console.log(error);
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
