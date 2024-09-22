import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Section } from '../../shared/types/section.types';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent implements OnInit {
  section: Section = {} as Section;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.paramMap.get('sectionSlug'));

    this.activatedRoute.data.subscribe((response) => {
      const section = response['section'] as Section;
      if (!section) {
        console.log('No Section Found', section);
      }
      this.section = section;
    });
  }
}
