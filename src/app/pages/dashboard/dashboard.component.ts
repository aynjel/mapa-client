import { Component, OnInit } from '@angular/core';
import { SectionService } from '../../shared/services/section.service';
import { Router } from '@angular/router';
import { Section } from '../../shared/types/section.types';
import { BehaviorSubject, finalize, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SectionFormComponent } from '../../components/section-form/section-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private sectionsSource = new BehaviorSubject<Section[]>([]);
  sections$ = this.sectionsSource.asObservable();
  isLoading = false;

  constructor(
    private sectionService: SectionService,
    private route: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.loadData();
  }

  onSubmitSearch(searchKeyText: string) {
    console.log(searchKeyText);

    // this.sections$.subscribe((sections) => {
    //   const secs = sections.filter((section) => {
    //     const searchKey = searchKeyText.toLowerCase();
    //     return section.title.toLowerCase().includes(searchKey);
    //   });

    //   console.log(secs);
    // });
  }

  onClickAddSection() {
    const dialogRef = this.matDialog.open(SectionFormComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((res: Section) => {
      if (res) {
        this.loadData();
      }
    });
  }

  loadData(page?: number, limit?: number) {
    this.sectionService
      .getSections(page, limit)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.sectionsSource.next(res.data);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  onClick(section: Section) {
    this.route.navigate(['/mapa/dashboard', section.slug]);
  }
}
