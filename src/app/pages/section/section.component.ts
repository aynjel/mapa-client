import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Section } from '../../shared/types/section.types';
import { SectionService } from '../../shared/services/section.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { BehaviorSubject, delay, finalize, Observable, of } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { UserDataSource } from '../../shared/types/user.types';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent implements OnInit {
  private sectionSource = new BehaviorSubject<Section>({} as Section);
  section$ = this.sectionSource.asObservable();
  isLoading = false;

  user$: Observable<UserDataSource | null> = of(null);

  constructor(
    public titleService: Title,
    private sectionService: SectionService,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private route: Router,
    private matDialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.current$;
    this.isLoading = true;
    this.loadSectionData();
  }

  loadSectionData() {
    // section slug from url
    const sectionSlug =
      this.activatedRoute.snapshot.paramMap.get('sectionSlug');
    if (sectionSlug) {
      this.sectionService
        .getSection(sectionSlug)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (res) => {
            this.sectionSource.next(res.data);
          },
          error: (error) => {
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

  back() {
    window.history.back();
  }
}
