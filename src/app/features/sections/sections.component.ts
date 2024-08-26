import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SectionFormComponent } from './section-form/section-form.component';
import { SectionStore } from './sections.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UpperCasePipe } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { Section } from './types/section.types';
import { AuthStore } from '@core/auth/auth.store';
import { MatRippleModule } from '@angular/material/core';
import { SectionsListComponent } from './components/sections-list/sections-list.component';

@Component({
  selector: 'app-sections',
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
    MatRippleModule,
    FormsModule,
    UpperCasePipe,
    SectionsListComponent,
  ],
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionsComponent {
  protected authStore = inject(AuthStore);
  protected sectionStore = inject(SectionStore);
  readonly dialog = inject(MatDialog);

  searchFilter = signal<string>('');

  setFilter = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    this.searchFilter.set(value);
    this.sectionStore.setSearchKeyword(this.searchFilter());
  };

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
