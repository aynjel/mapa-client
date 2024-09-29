import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Section } from '../../shared/types/section.types';
import { SectionService } from '../../shared/services/section.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../shared/components/alert/alert.component';

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
    private snackbar: MatSnackBar,
    private route: Router,
    private matDialog: MatDialog
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

  onSectionDelete(section: Section) {
    if (section) {
      const dialog = this.matDialog.open(AlertComponent, {
        data: {
          title: 'Delete Section',
          message:
            'Please note that this will delete all related announcement and lesson to this section',
        },
      });

      dialog.afterClosed().subscribe((res) => {
        if (res) {
          this.sectionService.deleteSection(section).subscribe({
            next: (res) => {
              this.snackbar.open(res.message, 'Close', {
                duration: 3000,
              });
              this.route.navigate(['/mapa']);
            },
            error: (error) => {
              console.error(error);
              this.snackbar.open(
                error.error.message || error.message,
                'Close',
                {
                  duration: 3000,
                }
              );
            },
          });
        }
      });
    }
  }
}
