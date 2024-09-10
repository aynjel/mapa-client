import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Section } from '../../types/section.types';
import * as SectionActions from '../../store/section.actions';
import { AppState } from '../../../../store/app.store';
import {
  sectionLoadingSelector,
  sectionSelector,
} from '../../store/section.selectors';

@Component({
  selector: 'app-section-page',
  templateUrl: './section-page.component.html',
  styleUrl: './section-page.component.scss',
})
export class SectionPageComponent {
  sections$: Observable<Section[]> = this.store.select(sectionSelector);
  isLoading$: Observable<boolean> = this.store.select(sectionLoadingSelector);

  constructor(private store: Store<AppState>) {
    this.loadSections();
  }

  loadSections() {
    this.store.dispatch(SectionActions.loadSections());
  }

  addSection(index: number) {
    const section: Section = {
      id: index.toLocaleString(),
      name: 'New Section - ' + Math.random(),
      description: 'description ' + Math.random(),
    };
    console.log(section);

    this.store.dispatch(SectionActions.addSection({ section: section }));
  }
}
