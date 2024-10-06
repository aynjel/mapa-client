import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Announcement } from '../../shared/types/announcement.types';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { AuthService } from '../../shared/services/auth.service';
import { Observable, of } from 'rxjs';
import { UserDataSource } from '../../shared/types/user.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-announcement-card',
  templateUrl: './announcement-card.component.html',
  styleUrl: './announcement-card.component.scss',
})
export class AnnouncementCardComponent {
  @Input() announcement!: Announcement;
  @Output() announcementDelete = new EventEmitter<Announcement>();

  user$: Observable<UserDataSource | null> = of(null);

  constructor(
    private matDialog: MatDialog,
    private authService: AuthService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.current$;
  }

  onAnnouncementClick(announcement: Announcement) {
    this.route.navigate(['/mapa/details/announcements', announcement.slug]);
  }
}
