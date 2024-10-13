import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MoreInfoComponent } from '../../shared/components/more-info/more-info.component';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.scss',
})
export class PageLayoutComponent {
  @Input({ required: true }) title: string = 'Page Title';
  @Input() description: string = 'Page Description';
  @Input() deleteBtn: boolean = false;
  @Input() editBtn: boolean = false;
  @Input() commentBtn: boolean = false;

  @Input() isLoading: boolean = false;

  @Output() deleteBtnEmitter: EventEmitter<Event> = new EventEmitter();
  @Output() editBtnEmitter: EventEmitter<Event> = new EventEmitter();

  constructor(private snackBar: MatSnackBar, private matDialog: MatDialog) {}

  showCommentContent: boolean = false;

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
