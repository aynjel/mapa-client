import { Component, Input, OnInit } from '@angular/core';
import { Section } from '../../shared/types/section.types';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AnnouncementFormComponent } from '../announcement-form/announcement-form.component';
import { ActivatedRoute } from '@angular/router';
import { AnnouncementService } from '../../shared/services/announcement.service';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  finalize,
  forkJoin,
  Observable,
  of,
} from 'rxjs';
import { Announcement } from '../../shared/types/announcement.types';
import { LessonFormComponent } from '../lesson-form/lesson-form.component';
import { Lesson } from '../../shared/types/lesson.types';
import { LessonService } from '../../shared/services/lesson.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../shared/services/auth.service';
import { UserDataSource } from '../../shared/types/user.types';

@Component({
  selector: 'app-section-tabs',
  templateUrl: './section-tabs.component.html',
  styleUrl: './section-tabs.component.scss',
})
export class SectionTabsComponent implements OnInit {
  @Input() section!: Section;

  isLoading = false;

  inputValue: string = '';

  displayedColumns: string[] = ['position', 'name'];

  announcementSource = new BehaviorSubject<Announcement[]>([]);
  lessonSource = new BehaviorSubject<Lesson[]>([]);

  announcements$ = this.announcementSource.asObservable();
  lessons$ = this.lessonSource.asObservable();

  user$: Observable<UserDataSource | null> = of(null);

  constructor(
    private activatedRoute: ActivatedRoute,
    private announcementService: AnnouncementService,
    private lessonService: LessonService,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.current$;
    this.isLoading = true;
    this.loadSectionData();
  }

  loadSectionData(page?: number, limit?: number) {
    // Combine HTTP requests for efficiency (if applicable):
    const sectionSlug =
      this.activatedRoute.snapshot.paramMap.get('sectionSlug');
    if (sectionSlug) {
      // Use `forkJoin` to combine requests if services are on the same backend
      this.isLoading = true; // Set loading state before requests

      forkJoin([
        this.announcementService.getAnnouncementsBySection(
          sectionSlug,
          page,
          limit
        ),
        this.lessonService.getLessonsBySection(sectionSlug, page, limit),
      ])
        .pipe(
          finalize(() => (this.isLoading = false)),
          catchError((error) => {
            console.error(error);
            this.announcementSource.next([]);
            this.lessonSource.next([]);
            return EMPTY; // Handle errors gracefully, prevent further processing
          })
        )
        .subscribe(([announcementsResponse, lessonsResponse]) => {
          this.announcementSource.next(announcementsResponse.data);
          this.lessonSource.next(lessonsResponse.data);
        });
    }
  }

  applyFilter(event: string) {
    this.inputValue = event;
  }

  onClickAnnouncement(event: Announcement) {
    console.log(event);
  }

  onClickLesson(event: Lesson) {
    console.log(event);
  }

  onClickAddAnnouncement() {
    this.matDialog
      .open(AnnouncementFormComponent, {
        width: '600px',
        data: this.section,
      })
      .afterClosed()
      .subscribe((res: Announcement) => {
        if (res) {
          this.loadSectionData();
        }
      });
  }

  onClickAddLesson() {
    this.matDialog
      .open(LessonFormComponent, {
        width: '600px',
        data: this.section,
      })
      .afterClosed()
      .subscribe((res: Lesson) => {
        if (res) {
          this.loadSectionData();
        }
      });
  }

  onDeleteAnnouncement(a: Announcement) {
    // console.log(a);

    if (a) {
      this.announcementService.deleteAnnouncement(a).subscribe({
        next: () => {
          this.loadSectionData();
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

  onDeleteLesson(l: Lesson) {
    if (l) {
      this.lessonService.deleteLesson(l).subscribe({
        next: () => {
          this.loadSectionData();
          this.snackBar.open('Lesson deleted', 'Close', {
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
