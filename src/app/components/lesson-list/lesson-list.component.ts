import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Lesson } from '../../shared/types/lesson.types';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrl: './lesson-list.component.scss',
})
export class LessonListComponent {
  @Input() lessons: Lesson[] = [];
  @Input() isLoading: boolean = false;
  @Output() lessonClick = new EventEmitter<Lesson>();
  @Output() lessonDelete = new EventEmitter<Lesson>();

  onLessonClick(lesson: Lesson) {
    this.lessonClick.emit(lesson);
  }

  onLessonDelete(lesson: Lesson) {
    this.lessonDelete.emit(lesson);
  }
}
