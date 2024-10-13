import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrl: './more-info.component.scss',
})
export class MoreInfoComponent {
  constructor(
    private dialogRef: MatDialogRef<MoreInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
