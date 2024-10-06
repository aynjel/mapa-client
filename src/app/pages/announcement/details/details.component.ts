import { Component, OnInit } from '@angular/core';
import { Announcement } from '../../../shared/types/announcement.types';
import { AnnouncementService } from '../../../shared/services/announcement.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserDataSource } from '../../../shared/types/user.types';
import { AuthService } from '../../../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  announcementSource = new BehaviorSubject<Announcement>({} as Announcement);
  announcement$ = this.announcementSource.asObservable();
  isLoading = false;

  announcementSlug: string = '';

  user$: Observable<UserDataSource | null> = of(null);

  constructor(
    private announcementService: AnnouncementService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog
  ) {
    this.activatedRoute.params.subscribe(
      (params) => (this.announcementSlug = params['announcementSlug'])
    );
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.user$ = this.authService.current$;

    this.announcementService
      .getAnnouncement(this.announcementSlug)
      .subscribe((res) => {
        if (res) {
          this.announcementSource.next(res.data);
          this.isLoading = false;
        }
      });
  }

  onDeleteAnnouncement(a: Announcement) {
    const dialogRef = this.matDialog.open(AlertComponent, {
      data: {
        title: `Delete ${a.title}`,
        message: 'Are you sure you want to delete this announcement?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.announcementService.deleteAnnouncement(a).subscribe({
          next: () => {
            this.snackBar.open('Announcement deleted', 'Close', {
              duration: 3000,
            });
            window.history.back();
          },
          error: (error) => {
            console.error(error);
          },
        });
      }
    });
  }
}