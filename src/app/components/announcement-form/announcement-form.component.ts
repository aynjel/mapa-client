import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnnouncementService } from '../../shared/services/announcement.service';
import { finalize } from 'rxjs';
import { Section } from '../../shared/types/section.types';

@Component({
  selector: 'app-announcement-form',
  templateUrl: './announcement-form.component.html',
  styleUrl: './announcement-form.component.scss',
})
export class AnnouncementFormComponent {
  announcementForm!: FormGroup;
  isLoading = false;

  fileName = '';
  content: any;

  constructor(
    private formBuilder: FormBuilder,
    private announcementService: AnnouncementService,
    private dialog: MatDialogRef<AnnouncementFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Section
  ) {
    this.announcementForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    const postFormData = new FormData();
    postFormData.append('title', this.announcementForm.value.title);
    postFormData.append('description', this.announcementForm.value.description);
    postFormData.append('content', this.content);

    this.isLoading = true;

    if (this.announcementForm.valid) {
      this.announcementService
        .createAnnouncement(postFormData, this.data.slug)
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
