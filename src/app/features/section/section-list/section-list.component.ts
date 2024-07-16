import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { SectionInitialStateTypes } from '../section.reducer';

interface SectionTypes {
  id: string;
  name: string;
}

@Component({
  selector: 'app-section-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButton,
    MatListModule,
    MatCardModule,
    MatDividerModule,
  ],
  template: `
    <!-- <mat-card>
      <mat-card-header>
        <mat-card-title>Sections</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-list>
          <mat-divider></mat-divider>
          <mat-list-item
            *ngFor="let section of sections$ | async"
            class="list-item"
            [routerLink]="['/section', section.id]"
          >
            {{ section.name }}
          </mat-list-item>
          <mat-divider></mat-divider>
        </mat-list>
      </mat-card-content>
    </mat-card> -->
  `,
  styles: `
 
    mat-card {
      max-width: 400px;
      max-height: calc(100vh - 6rem);
      margin: 2rem auto 0;
    }
    mat-card-header {
      justify-content: center;
      margin-bottom: 1rem;
    }
    mat-card-title {
      font-size: 1.5rem;
    }
    mat-card-content {
      padding: 0;
      
      overflow-y: auto;
    }
    .list-item {
      cursor: pointer;
    }
  `,
})
export class SectionListComponent {
  private store = inject(Store);

  store$: Observable<SectionInitialStateTypes[]>;

  sections$: Subscription;

  constructor() {
    this.store$ = this.store.select('section');
    this.sections$ = this.store$.subscribe({
      next: (state) => {
        // console.log(state.sections);
      },
    });
  }
}
