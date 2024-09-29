import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Lesson } from '../../shared/types/lesson.types';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { Observable, of } from 'rxjs';
import { UserDataSource } from '../../shared/types/user.types';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-lesson-card',
  templateUrl: './lesson-card.component.html',
  styleUrl: './lesson-card.component.scss',
})
export class LessonCardComponent implements OnInit {
  @Input() lesson!: Lesson;
  @Output() lessonClick = new EventEmitter<Lesson>();
  @Output() lessonDelete = new EventEmitter<Lesson>();

  user$: Observable<UserDataSource | null> = of(null);

  constructor(private matDialog: MatDialog, private authService: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.authService.current$;
  }

  onLessonDelete(lesson: Lesson) {
    const dialogRef = this.matDialog.open(AlertComponent, {
      data: {
        title: `Delete ${lesson.title}`,
        message: 'Are you sure you want to delete this lesson?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.lessonDelete.emit(lesson);
      }
    });
  }

  onLessonClick(lesson: Lesson) {
    this.lessonClick.emit(lesson);
  }
}
