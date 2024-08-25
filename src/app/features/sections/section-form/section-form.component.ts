import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SectionStore } from '../sections.store';

@Component({
  selector: 'app-section-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  templateUrl: './section-form.component.html',
  styleUrl: './section-form.component.scss',
})
export class SectionFormComponent {
  protected readonly sectionStore = inject(SectionStore);
  private formBuilder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  sectionForm!: FormGroup;

  constructor() {
    this.sectionForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  onSubmit() {
    if (this.sectionForm.valid) {
      this.sectionStore.addSection(this.sectionForm.value);
      this.snackBar.open(this.sectionStore.message(), 'Close', {
        duration: 3000,
      });
      this.dialog.closeAll();
      this.sectionStore.getSections();
      if (!this.sectionStore.isLoading()) {
        console.log('Form Submitted');
      }
    }
  }
}
