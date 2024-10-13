import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MoreInfoComponent } from '../../shared/components/more-info/more-info.component';
import { Comment } from '../../shared/types/comment.types';
import { Observable, of } from 'rxjs';
import { UserDataSource } from '../../shared/types/user.types';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.scss',
})
export class PageLayoutComponent implements OnInit {
  @Input({ required: true }) title: string = 'Page Title';
  @Input() description: string = 'Page Description';

  @Input() commentLists: Comment[] = [];
  @Input() commentCount: number = 0;

  @Input() deleteBtn: boolean = false;
  @Input() editBtn: boolean = false;
  @Input() commentBtn: boolean = false;

  @Input() isLoading: boolean = false;

  @Output() deleteBtnEmitter: EventEmitter<Event> = new EventEmitter();
  @Output() editBtnEmitter: EventEmitter<Event> = new EventEmitter();

  user$: Observable<UserDataSource | null> = of(null);

  showCommentContent: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private matDialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.current$;
  }

  onMoreInfo(): void {
    this.matDialog.open(MoreInfoComponent, {
      width: '600px',
      data: { title: this.title, description: this.description },
    });
  }

  onDelete(): void {
    this.deleteBtnEmitter.emit();
  }

  onEdit(): void {
    this.editBtnEmitter.emit();
  }

  onComment(): void {
    this.showCommentContent = !this.showCommentContent;
  }

  back() {
    window.history.back();
  }
}
