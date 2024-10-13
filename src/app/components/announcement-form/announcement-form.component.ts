import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnnouncementService } from '../../shared/services/announcement.service';
import { finalize } from 'rxjs';
import { Section } from '../../shared/types/section.types';
import { Announcement } from '../../shared/types/announcement.types';
import { Lesson } from '../../shared/types/lesson.types';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-announcement-form',
  templateUrl: './announcement-form.component.html',
  styleUrl: './announcement-form.component.scss',
})
export class AnnouncementFormComponent implements OnInit {
  announcementForm!: FormGroup;
  isLoading: boolean = false;
  isEdit: boolean = false;

  fileName: string = '';
  content: any;

  constructor(
    private formBuilder: FormBuilder,
    private announcementService: AnnouncementService,
    private dialog: MatDialogRef<AnnouncementFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private activatedRoute: ActivatedRoute
  ) {
    this.announcementForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.announcement) {
      this.announcementForm.patchValue(this.data.announcement);
    }
  }

  onSubmit() {
    this.isLoading = true;

    const postFormData = new FormData();
    postFormData.append('title', this.announcementForm.value.title);
    postFormData.append('description', this.announcementForm.value.description);
    postFormData.append('content', this.content);

    if (this.announcementForm.valid) {
      this.announcementForm.disable();

      if (this.data.announcement) {
        this.announcementService
          .updateAnnouncement(this.data.announcement, postFormData)
          .pipe(
            finalize(() => {
              this.isLoading = false;
              this.announcementForm.enable();
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
        this.announcementService
          .createAnnouncement(postFormData, this.data.sectionSlug)
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
