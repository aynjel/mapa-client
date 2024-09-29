import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Announcement } from '../../shared/types/announcement.types';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { AuthService } from '../../shared/services/auth.service';
import { Observable, of } from 'rxjs';
import { UserDataSource } from '../../shared/types/user.types';

@Component({
  selector: 'app-announcement-card',
  templateUrl: './announcement-card.component.html',
  styleUrl: './announcement-card.component.scss',
})
export class AnnouncementCardComponent {
  @Input() announcement!: Announcement;
  @Output() announcementClick = new EventEmitter<Announcement>();
  @Output() announcementDelete = new EventEmitter<Announcement>();

  user$: Observable<UserDataSource | null> = of(null);

  constructor(private matDialog: MatDialog, private authService: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.authService.current$;
  }

  onAnnouncementDelete(announcement: Announcement) {
    const dialogRef = this.matDialog.open(AlertComponent, {
      data: {
        title: `Delete ${announcement.title}`,
        message: 'Are you sure you want to delete this announcement?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.announcementDelete.emit(announcement);
      }
    });
  }

  onAnnouncementClick(announcement: Announcement) {
    this.announcementClick.emit(announcement);
  }
}
