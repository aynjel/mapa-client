import { Component, OnInit } from '@angular/core';
import { SectionService } from '../../shared/services/section.service';
import { Router } from '@angular/router';
import { Section } from '../../shared/types/section.types';
import { BehaviorSubject, finalize, map, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SectionFormComponent } from '../../components/section-form/section-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../shared/services/auth.service';
import { UserDataSource } from '../../shared/types/user.types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private sectionsSource = new BehaviorSubject<Section[]>([]);
  sections$ = this.sectionsSource.asObservable();
  isLoading = false;
  user$: Observable<UserDataSource | null> = of(null);

  constructor(
    private sectionService: SectionService,
    private route: Router,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.current$;
    this.isLoading = true;
    this.loadData();
  }

  onSubmitSearch(searchKeyText: string) {
    console.log(searchKeyText);

    // this.sections$.subscribe((sections) => {
    //   const secs = sections.filter((section) => {
    //     const searchKey = searchKeyText.toLowerCase();
    //     return section.title.toLowerCase().includes(searchKey);
    //   });

    //   console.log(secs);
    // });
  }

  onClickAddSection() {
    const dialogRef = this.matDialog.open(SectionFormComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((res: Section) => {
      if (res) {
        this.loadData();
      }
    });
  }

  loadData(page?: number, limit?: number) {
    this.sectionService
      .getSections(page, limit)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.sectionsSource.next(res.data);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  onClick(section: Section) {
    this.route.navigate(['/mapa/dashboard', section.slug]);
  }

  onDeleteSection(s: Section) {
    if (s) {
      this.sectionService.deleteSection(s).subscribe({
        next: () => {
          this.loadData();
          this.snackBar.open('Announcement deleted', 'Close', {
            duration: 3000,
          });
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
