import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Section } from '../types/section.types';

@Component({
  selector: 'app-section-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './section-layout.component.html',
  styleUrl: './section-layout.component.scss',
})
export class SectionLayoutComponent implements OnInit {
  protected titleService = inject(Title);
  private readonly activatedRoute = inject(ActivatedRoute);

  section: Section | null = null;

  ngOnInit(): void {
    console.log(this.activatedRoute.data);

    this.activatedRoute.data.subscribe((response) => {
      console.log('SECTION FETCHING', response);
      this.section = response['section'];
      if (this.section) {
        this.titleService.setTitle(this.section.title);
      }
    });
  }
  back() {
    window.history.back();
  }
}
