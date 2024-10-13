import { Component } from '@angular/core';
import { Lesson } from '../../shared/types/lesson.types';
import { BehaviorSubject, finalize } from 'rxjs';
import { Router } from '@angular/router';
import { LessonService } from '../../shared/services/lesson.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss',
})
export class LessonComponent {
  private lessonsSource = new BehaviorSubject<Lesson[]>([]);
  lessons$ = this.lessonsSource.asObservable();
  isLoading = false;

  constructor(
    private lessonService: LessonService,
    private route: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.loadData();
  }

  loadData(page?: number, limit?: number) {
    this.lessonService
      .getLessons(page, limit)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          console.log(res);

          this.lessonsSource.next(res.data);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  onSubmitSearch(searchKeyText: string) {
    console.log(searchKeyText);
  }

  onClick(lesson: Lesson) {
    this.route.navigate(['/mapa/details/lessons', lesson.slug]);
  }

  onDeleteLesson(l: Lesson) {
    if (l) {
      this.lessonService.deleteLesson(l).subscribe({
        next: () => {
          this.loadData();
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
