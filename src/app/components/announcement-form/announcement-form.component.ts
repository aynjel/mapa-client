import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnnouncementService } from '../../shared/services/announcement.service';

@Component({
  selector: 'app-announcement-form',
  templateUrl: './announcement-form.component.html',
  styleUrl: './announcement-form.component.scss',
})
export class AnnouncementFormComponent {
  announcementForm!: FormGroup;
  isLoading = false;

  fileName = '';

  constructor(
    private formBuilder: FormBuilder,
    private announcementService: AnnouncementService,
    private dialog: MatDialogRef<AnnouncementFormComponent>,
    private snackBar: MatSnackBar
  ) {
    this.announcementForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      file: [''],
    });
  }

  onSubmit() {
    console.log(this.announcementForm.value);

    // this.isLoading = true;
    // this.announcementService
    //   .createAnnouncement(this.announcementForm.value)
    //   .subscribe({
    //     next: (res) => {
    //       this.dialog.close(res.data);
    //       this.snackBar.open('Announcement created successfully', 'Close', {
    //         duration: 3000,
    //       });
    //     },
    //     error: (error) => {
    //       console.log(error);
    //       this.snackBar
    //         .open(error.error.message || 'Something went wrong', 'Close', {
    //           duration: 3000,
    //         })
    //         .afterDismissed()
    //         .subscribe(() => {
    //           this.isLoading = false;
    //         });
    //     },
    //     complete: () => {
    //       this.isLoading = false;
    //     },
    //   });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      this.announcementForm.patchValue({
        file: file,
      });
    }
  }
}
