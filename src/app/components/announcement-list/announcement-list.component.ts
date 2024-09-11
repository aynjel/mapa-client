import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Announcement } from '../../shared/types/announcement.types';

@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrl: './announcement-list.component.scss',
})
export class AnnouncementListComponent {
  @Input() announcements: Announcement[] = [];
  @Output() announcementClick = new EventEmitter<Announcement>();

  onAnnouncementClick(announcement: Announcement) {
    this.announcementClick.emit(announcement);
  }
}
