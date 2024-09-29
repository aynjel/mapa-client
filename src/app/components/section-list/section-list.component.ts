import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Section } from '../../shared/types/section.types';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrl: './section-list.component.scss',
})
export class SectionListComponent {
  @Input() sections: Section[] = [];
  @Input() isLoading: boolean = false;
  @Output() sectionClick = new EventEmitter<Section>();
  @Output() sectionDelete = new EventEmitter<Section>();

  @Input() hideActions = false;

  onSectionClick(section: Section) {
    this.sectionClick.emit(section);
  }

  onSectionDelete(section: Section) {
    this.sectionDelete.emit(section);
  }
}
