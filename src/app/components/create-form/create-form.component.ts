import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../../shared/services/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Announcement } from '../../shared/types/announcement.types';
import { Lesson } from '../../shared/types/lesson.types';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss',
})
export class CreateFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  isLesson: boolean = false;
  isAnnouncement: boolean = false;

  isLoading: boolean = false;

  fileName: string = '';
  content: any;

  constructor(
    private formBuilder: FormBuilder,
    private generalService: GeneralService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Announcement | Lesson,
    private dialog: MatDialogRef<CreateFormComponent>
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.isLoading = true;

    const postFormData = new FormData();
    postFormData.append('title', this.form.value.title);
    postFormData.append('description', this.form.value.description);
    postFormData.append('content', this.content);

    console.log(this.form.value);

    if (this.form.valid) {
      const createFunction = this.isAnnouncement
        ? this.generalService.createAnnouncement
        : this.generalService.createLesson;

      createFunction(postFormData, this.data.slug).subscribe({
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
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.fileName = file.name;
      this.content = file;
    }
  }
}
