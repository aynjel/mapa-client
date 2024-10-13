import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Announcement } from '../../shared/types/announcement.types';
import { Lesson } from '../../shared/types/lesson.types';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.scss',
})
export class ListItemsComponent {
  @Input({ required: true }) lists: Array<Announcement | Lesson> = [];
  @Input() icon: string = '';

  @Output() onClickEmitter: EventEmitter<Announcement | Lesson> =
    new EventEmitter();

  onClickEmit(list: Announcement) {
    this.onClickEmitter.emit(list);
  }
}
