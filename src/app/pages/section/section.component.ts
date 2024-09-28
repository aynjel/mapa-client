import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Section } from '../../shared/types/section.types';
import { SectionService } from '../../shared/services/section.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent implements OnInit {
  section: Section = {} as Section;

  constructor(
    private sectionService: SectionService,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadSectionData();
  }

  loadSectionData() {
    // section slug from url
    const sectionSlug =
      this.activatedRoute.snapshot.paramMap.get('sectionSlug');
    if (sectionSlug) {
      this.sectionService.getSection(sectionSlug).subscribe({
        next: (res) => {
          this.section = res.data;
        },
        error: (error) => {
          console.error(error);
          this.snackbar.open(error.error.message || error.message, 'Close', {
            duration: 3000,
          });
        },
      });
    }
  }
}
