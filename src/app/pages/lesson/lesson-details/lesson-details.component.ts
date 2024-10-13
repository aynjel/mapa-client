import { Component } from '@angular/core';
import { Lesson } from '../../../shared/types/lesson.types';
import { BehaviorSubject, finalize, Observable, of } from 'rxjs';
import { UserDataSource } from '../../../shared/types/user.types';
import { LessonService } from '../../../shared/services/lesson.service';
import { AuthService } from '../../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { GeneralService } from '../../../shared/services/general.service';
import { LessonFormComponent } from '../../../components/lesson-form/lesson-form.component';

@Component({
  selector: 'app-lesson-details',
  templateUrl: './lesson-details.component.html',
  styleUrl: './lesson-details.component.scss',
})
export class LessonDetailsComponent {
  lessonSource = new BehaviorSubject<Lesson>({} as Lesson);
  lesson$ = this.lessonSource.asObservable();
  isLoading = false;
  lessonSlug: string = '';
  user$: Observable<UserDataSource | null> = of(null);
  constructor(
    private generalService: GeneralService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog,
    private route: Router
  ) {
    this.activatedRoute.params.subscribe(
      (params) => (this.lessonSlug = params['lessonSlug'])
    );
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.user$ = this.authService.current$;
    this.generalService
      .getLessonById(this.lessonSlug)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          this.lessonSource.next(res.data);
        },
        error: (error) => {
          this.snackBar.open(error.error.message || error.message, 'Close', {
            duration: 3000,
          });
        },
      });
  }
  onDeleteLesson(l: Lesson) {
    this.isLoading = true;

    const dialogRef = this.matDialog.open(AlertComponent, {
      width: '600px',
      data: {
        title: 'Confirm Delete',
        message: 'Proceed to delete?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.generalService
          .deleteLesson(l)
          .pipe(finalize(() => (this.isLoading = false)))
          .subscribe(() => {
            this.snackBar.open('Lesson deleted', 'Close', {
              duration: 3000,
            });
            window.history.back();
          });
      }
    });
  }

  onEditLesson(l: Lesson): void {
    const dialogRef = this.matDialog.open(LessonFormComponent, {
      width: '600px',
      data: {
        lesson: l,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.lessonSource.next(result);
      }
    });
  }

  back() {
    // this.route.navigate(['/mapa/details/lessons', this.lessonSlug]);
    window.history.back();
  }
}
