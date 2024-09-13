import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Section } from '../../shared/types/section.types';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent implements OnInit {
  section: Section = {} as Section;

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.paramMap.get('sectionSlug'));

    this.activatedRoute.data.subscribe((response) => {
      const section = response['section'] as Section;
      if (!section) {
        console.log('No Section Found', section);
      }
      console.log(response['section']);
      this.section = section;
      this.titleService.setTitle(section.title.toLocaleUpperCase());
    });
  }
}
