import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Announcement } from '../../shared/types/announcement.types';

@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrl: './announcement-list.component.scss',
})
export class AnnouncementListComponent {
  @Input() announcements: Announcement[] = [];
  @Input() isLoading: boolean = false;
  @Output() announcementClick = new EventEmitter<Announcement>();
  @Output() announcementDelete = new EventEmitter<Announcement>();

  onAnnouncementClick(announcement: Announcement) {
    this.announcementClick.emit(announcement);
  }

  onAnnouncementDelete(announcement: Announcement) {
    this.announcementDelete.emit(announcement);
  }
}
