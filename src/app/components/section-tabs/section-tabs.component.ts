import { Component, Input } from '@angular/core';
import { Section } from '../../shared/types/section.types';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AnnouncementFormComponent } from '../announcement-form/announcement-form.component';

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
export class SectionTabsComponent {
  @Input() section!: Section;

  inputValue: string = '';

  displayedColumns: string[] = ['position', 'name'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private matDialog: MatDialog) {}

  applyFilter(event: string) {
    this.dataSource.filter = event.trim().toLowerCase();
    this.inputValue = event;
  }

  onClickAddAnnouncement() {
    const dialogRef = this.matDialog.open(AnnouncementFormComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((res: Section) => {
      console.log(res);
    });
  }
}
