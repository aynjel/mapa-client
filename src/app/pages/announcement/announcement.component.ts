import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../shared/services/announcement.service';
import { Announcement } from '../../shared/types/announcement.types';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.scss',
})
export class AnnouncementComponent implements OnInit {
  announcements: Announcement[] = [];

  constructor(private announcementService: AnnouncementService) {}

  ngOnInit(): void {
    this.announcementService.getAnnouncements().subscribe((res) => {
      this.announcements = res.data;
    });
  }
}
