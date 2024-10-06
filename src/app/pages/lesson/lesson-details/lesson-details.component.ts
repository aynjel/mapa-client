import { Component } from '@angular/core';
import { Lesson } from '../../../shared/types/lesson.types';
import { BehaviorSubject, finalize, Observable, of } from 'rxjs';
import { UserDataSource } from '../../../shared/types/user.types';
import { LessonService } from '../../../shared/services/lesson.service';
import { AuthService } from '../../../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../../shared/components/alert/alert.component';

@Component({
  selector: 'app-lesson-details',
  templateUrl: './lesson-details.component.html',
  styleUrl: './lesson-details.component.scss',
})
export class LessonDetailsComponent {
  // lessonSource = new BehaviorSubject<Lesson>({} as Lesson);
  // lesson$ = this.lessonSource.asObservable();
  // isLoading = false;
  // lessonSlug: string = '';
  // user$: Observable<UserDataSource | null> = of(null);
  // constructor(
  //   private lessonService: LessonService,
  //   private authService: AuthService,
  //   private activatedRoute: ActivatedRoute,
  //   private snackBar: MatSnackBar,
  //   private matDialog: MatDialog
  // ) {
  //   this.activatedRoute.params.subscribe(
  //     (params) => (this.lessonSlug = params['lessonSlug'])
  //   );
  // }
  // ngOnInit(): void {
  //   this.isLoading = true;
  //   this.user$ = this.authService.current$;
  //   this.lessonService
  //     .getLesson(this.lessonSlug)
  //     .pipe(finalize(() => (this.isLoading = false)))
  //     .subscribe({
  //       next: (res) => {
  //         this.lessonSource.next(res.data);
  //       },
  //       error: (error) => {
  //         this.snackBar.open(error.error.message || error.message, 'Close', {
  //           duration: 3000,
  //         });
  //       },
  //     });
  // }
  // onDeleteAnnouncement(l: Lesson) {
  //   const dialogRef = this.matDialog.open(AlertComponent, {
  //     data: {
  //       title: `Delete ${l.title}`,
  //       message: 'Are you sure you want to delete this announcement?',
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.announcementService.deleteAnnouncement(a).subscribe({
  //         next: () => {
  //           this.snackBar.open('Announcement deleted', 'Close', {
  //             duration: 3000,
  //           });
  //           window.history.back();
  //         },
  //         error: (error) => {
  //           console.error(error);
  //         },
  //       });
  //     }
  //   });
  // }
  // back() {
  //   window.history.back();
  // }
}
