import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
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
  content = new FormData();

  constructor(
    private formBuilder: FormBuilder,
    private announcementService: AnnouncementService,
    private matDialog: MatDialog,
    private dialog: MatDialogRef<AnnouncementFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Section
  ) {
    this.announcementForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  onSubmit() {
    console.log(this.announcementForm.value);

    this.isLoading = true;
    this.announcementService
      .createAnnouncement(this.announcementForm.value, this.data.slug)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.dialog.close(res.data);
          this.snackBar.open('Announcement created successfully', 'Close', {
            duration: 3000,
          });
        },
        error: (error) => {
          console.log(error);
          this.snackBar.open(
            error.error.message || 'Something went wrong',
            'Close',
            {
              duration: 3000,
            }
          );
        },
      });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.fileName = file.name;
      this.content.append('file', file);
      this.announcementForm.patchValue({ content: this.content });
    }
  }
}
