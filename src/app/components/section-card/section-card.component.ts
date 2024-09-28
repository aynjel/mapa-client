import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Section } from '../../shared/types/section.types';

@Component({
  selector: 'app-section-card',
  templateUrl: './section-card.component.html',
  styleUrl: './section-card.component.scss',
})
export class SectionCardComponent {
  @Input() section!: Section;
  @Input() isDetailsPage: boolean = false;
  @Input() height = '100%';
  @Output() sectionClick = new EventEmitter<Section>();

  onSectionClick(section: Section) {
    this.sectionClick.emit(section);
  }
}
