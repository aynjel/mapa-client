import { Component, Input, OnInit } from '@angular/core';
import { Section } from '../../shared/types/section.types';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AnnouncementFormComponent } from '../announcement-form/announcement-form.component';
import { ActivatedRoute } from '@angular/router';
import { AnnouncementService } from '../../shared/services/announcement.service';
import { BehaviorSubject, finalize } from 'rxjs';
import { Announcement } from '../../shared/types/announcement.types';

export interface PeriodicElement {
  name: string;
  position: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen' },
  { position: 2, name: 'Helium' },
  { position: 3, name: 'Lithium' },
  { position: 4, name: 'Beryllium' },
  { position: 5, name: 'Boron' },
  { position: 6, name: 'Carbon' },
  { position: 7, name: 'Nitrogen' },
  { position: 8, name: 'Oxygen' },
  { position: 9, name: 'Fluorine' },
  { position: 10, name: 'Neon' },
];

@Component({
  selector: 'app-section-tabs',
  templateUrl: './section-tabs.component.html',
  styleUrl: './section-tabs.component.scss',
})
export class SectionTabsComponent implements OnInit {
  @Input() section!: Section;

  isLoading = false;

  inputValue: string = '';

  displayedColumns: string[] = ['position', 'name'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  announcementSource = new BehaviorSubject<Announcement[]>([]);

  announcements$ = this.announcementSource.asObservable();

  constructor(
    private activatedRoute: ActivatedRoute,
    private announcementService: AnnouncementService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.loadSectionData();
  }

  loadSectionData(page?: number, limit?: number) {
    // section slug from url
    const sectionSlug =
      this.activatedRoute.snapshot.paramMap.get('sectionSlug');
    if (sectionSlug) {
      this.announcementService
        .getAnnouncementsBySection(sectionSlug, page, limit)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (res) => {
            console.log(res);
            this.announcementSource.next(res.data);
          },
          error: (error) => {
            console.error(error);
            this.announcementSource.next([]);
          },
        });
    }
  }

  applyFilter(event: string) {
    this.dataSource.filter = event.trim().toLowerCase();
    this.inputValue = event;
  }

  onClickAnnouncement(event: Announcement) {
    console.log(event);
  }

  onClickAddAnnouncement() {
    this.matDialog
      .open(AnnouncementFormComponent, {
        width: '600px',
        data: this.section,
      })
      .afterClosed()
      .subscribe((res: Announcement) => {
        if (res) {
          this.loadSectionData();
        }
      });
  }
}
