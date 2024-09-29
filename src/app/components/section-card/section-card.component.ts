import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Section } from '../../shared/types/section.types';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../shared/services/auth.service';
import { UserDataSource } from '../../shared/types/user.types';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-section-card',
  templateUrl: './section-card.component.html',
  styleUrl: './section-card.component.scss',
})
export class SectionCardComponent implements OnInit {
  @Input() section!: Section;
  @Input() isDetailsPage: boolean = false;
  @Input() height = '100%';
  @Output() sectionClick = new EventEmitter<Section>();
  @Output() sectionDelete = new EventEmitter<Section>();

  @Input() hideActions = false;

  user$: Observable<UserDataSource | null> = of(null);

  constructor(private matDialog: MatDialog, private authService: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.authService.current$;
  }

  onSectionClick(section: Section) {
    this.sectionClick.emit(section);
  }

  onSectionDelete(section: Section) {
    this.sectionDelete.emit(section);
  }
}
