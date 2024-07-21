import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { Section } from './types/Section.types';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  private http = inject(HttpClient);

  private readonly section = signal<Section[]>([]);
  readonly sectionSignal = this.section.asReadonly();

  getSections(): Signal<Section[]> {
    return this.section.asReadonly();
  }
}
