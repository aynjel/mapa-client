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
  @Output() announcementDelete = new EventEmitter<Announcement>();

  onAnnouncementDelete(announcement: Announcement) {
    this.announcementDelete.emit(announcement);
  }
}
