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
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SectionFormComponent } from './section-form/section-form.component';

@Component({
  selector: 'app-sections',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionsComponent {
  readonly dialog = inject(MatDialog);

  searchFilter = signal<string>('');

  setFilter = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    this.searchFilter.set(value);
  };

  addSectionModal() {
    const dialogRef = this.dialog.open(SectionFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
