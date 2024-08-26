import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Section } from '../types/section.types';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-section-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './section-layout.component.html',
  styleUrl: './section-layout.component.scss',
})
export class SectionLayoutComponent {
  protected titleService = inject(Title);
  private readonly activatedRoute = inject(ActivatedRoute);
  readonly dialog = inject(MatDialog);

  section: Section | null = null;

  back() {
    window.history.back();
  }

  infoModal() {
    console.log('infoModal');

    this.activatedRoute.data.subscribe((response) => {
      console.log(response);
      this.section = response['section'];

      if (this.section) {
        console.log(this.section);
      }
    });
  }
}
