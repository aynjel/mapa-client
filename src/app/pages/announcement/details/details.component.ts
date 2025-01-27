import { Component, OnInit } from '@angular/core';
import { Announcement } from '../../../shared/types/announcement.types';
import { AnnouncementService } from '../../../shared/services/announcement.service';
import { BehaviorSubject, delay, finalize, Observable, of } from 'rxjs';
import { UserDataSource } from '../../../shared/types/user.types';
import { AuthService } from '../../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { AnnouncementFormComponent } from '../../../components/announcement-form/announcement-form.component';
import {
  Comment,
  CreateCommentPayload,
} from '../../../shared/types/comment.types';
import { CommentService } from '../../../shared/services/comment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  announcementSource = new BehaviorSubject<Announcement>({} as Announcement);
  announcement$ = this.announcementSource.asObservable();

  commentsSource = new BehaviorSubject<Comment[]>([]);
  comments$ = this.commentsSource.asObservable();

  isLoading = false;

  announcementSlug: string = '';

  user$: Observable<UserDataSource | null> = of(null);

  commentForm: FormGroup = new FormGroup({});

  constructor(
    public titleService: Title,
    private announcementService: AnnouncementService,
    private authService: AuthService,
    private commentService: CommentService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog,
    private route: Router,
    private fb: FormBuilder
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
      .pipe(
        delay(1000),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (res) => {
          this.announcementSource.next(res.data);
        },
        error: (error) => {
          this.snackBar.open(error.error.message || error.message, 'Close', {
            duration: 3000,
          });
        },
      });

    this.commentForm = this.fb.group({
      content: ['', Validators.required],
    });

    this.loadComments();
  }

  onSubmitComment(): void {
    this.commentService
      .createComment(this.commentForm.value.content, this.announcementSlug)
      .subscribe((res) => {
        this.snackBar.open(res.message, 'Close', {
          duration: 3000,
        });
        this.loadComments();
        this.commentForm.reset();
      });
  }

  loadComments(): void {
    this.commentService.getComments(this.announcementSlug).subscribe({
      next: (res) => {
        const comments = res.data;

        comments.forEach((comment) => {
          this.userService
            .getUserById(comment.author)
            .pipe(delay(1000))
            .subscribe((res) => {
              comment.author = res.data;
              this.commentsSource.next(comments);
            });
        });
      },
      error: (error) => {
        this.snackBar.open(error.error.message || error.message, 'Close', {
          duration: 3000,
        });
      },
    });
  }

  onEditAnnouncement(a: Announcement): void {
    const dialogRef = this.matDialog.open(AnnouncementFormComponent, {
      width: '600px',
      data: {
        announcement: a,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.announcementSource.next(result);
      }
    });
  }

  onDeleteAnnouncement(a: Announcement): void {
    this.isLoading = true;

    const dialogRef = this.matDialog.open(AlertComponent, {
      width: '600px',
      data: {
        title: 'Confirm Delete',
        message: 'Proceed to delete?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.announcementService
          .deleteAnnouncement(a)
          .pipe(finalize(() => (this.isLoading = false)))
          .subscribe((res) => {
            this.snackBar.open(res.message, 'Close', {
              duration: 3000,
            });
            window.history.back();
          });
      } else {
        this.isLoading = false;
      }
    });
  }

  back() {
    // this.route.navigate(['/mapa/details/announcements', this.announcementSlug]);
    window.history.back();
  }
}
