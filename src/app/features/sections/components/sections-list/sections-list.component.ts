import { UpperCasePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';
import { SectionFormComponent } from '@features/sections/section-form/section-form.component';
import { SectionStore } from '@features/sections/sections.store';
import { Section } from '@features/sections/types/section.types';

@Component({
  selector: 'app-sections-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FormsModule,
    UpperCasePipe,
  ],
  templateUrl: './sections-list.component.html',
  styleUrl: './sections-list.component.scss',
})
export class SectionsListComponent {
  loadingState = input.required<boolean>();
  listsContent = input.required<Section[]>();
  searchFilter = input.required<string>();

  protected authStore = inject(AuthStore);
  protected sectionStore = inject(SectionStore);
  readonly dialog = inject(MatDialog);

  addSectionModal() {
    const dialogRef = this.dialog.open(SectionFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteSection(slug: string) {
    console.log(slug);
  }

  editSection(section: Section) {
    console.log(section);
  }
}
