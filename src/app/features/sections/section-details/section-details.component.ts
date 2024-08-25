import { Component, inject, OnInit } from '@angular/core';
import { Section } from '../types/section.types';
import { ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-section-details',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './section-details.component.html',
  styleUrl: './section-details.component.scss',
})
export class SectionDetailsComponent implements OnInit {
  protected titleService = inject(Title);
  private readonly activatedRoute = inject(ActivatedRoute);

  section: Section | null = null;

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response) => {
      this.section = response['section'];
      console.log('SECTION FETCHING', this.section);
    });
  }
}
