import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../shared/services/announcement.service';
import { Announcement } from '../../shared/types/announcement.types';
import { BehaviorSubject, finalize } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.scss',
})
export class AnnouncementComponent implements OnInit {
  private announcementsSource = new BehaviorSubject<Announcement[]>([]);
  announcements$ = this.announcementsSource.asObservable();
  isLoading = false;

  constructor(
    private announcementService: AnnouncementService,
    private route: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.loadData();
  }

  loadData(page?: number, limit?: number) {
    this.announcementService
      .getAnnouncements(page, limit)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.announcementsSource.next(res.data);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  onSubmitSearch(searchKeyText: string) {
    console.log(searchKeyText);
  }

  onClick(announcement: Announcement) {
    console.log(announcement);

    // if (announcement) {
    //   this.route.navigate(['/announcements', announcement.slug]);
    // }
  }

  onDeleteAnnouncement(a: Announcement) {
    if (a) {
      this.announcementService.deleteAnnouncement(a).subscribe({
        next: () => {
          this.loadData();
          this.snackBar.open('Announcement deleted', 'Close', {
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
