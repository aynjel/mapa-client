import { Component, inject, OnInit } from '@angular/core';
import { Section } from '../types/section.types';
import { ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SectionsListComponent } from '../components/sections-list/sections-list.component';
import { AuthStore } from '@core/auth/auth.store';

@Component({
  selector: 'app-section-details',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    SectionsListComponent,
    JsonPipe,
  ],
  templateUrl: './section-details.component.html',
  styleUrl: './section-details.component.scss',
})
export class SectionDetailsComponent implements OnInit {
  protected authStore = inject(AuthStore);
  // protected postStore = inject(PostStore);
  private readonly activatedRoute = inject(ActivatedRoute);

  section: Section | null = null;

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response) => {
      console.log(response);

      this.section = response['section'];
    });
  }

  addPostModal() {
    this.activatedRoute.data.subscribe((response) => {
      this.section = response['section'];
    });
  }
}
