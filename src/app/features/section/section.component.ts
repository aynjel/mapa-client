import { Component, inject, Signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { SectionService } from './section.service';
import { Section } from './types/Section.types';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [
    RouterLink,
    MatButton,
    MatListModule,
    MatCardModule,
    MatDividerModule,
  ],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent {
  private sectionService = inject(SectionService);

  sections: Signal<Section[]> = this.sectionService.getSections();
}
