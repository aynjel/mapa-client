import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

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
    <mat-card>
      <mat-card-header>
        <mat-card-title> Sections List ({{ sections.length }}) </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-list>
          @for(section of sections; track section){
          <mat-list-item
            class="list-item"
            [routerLink]="'/section/' + section.id"
          >
            {{ section.name }}
          </mat-list-item>
          <mat-divider></mat-divider>
          }
        </mat-list>
      </mat-card-content>
    </mat-card>
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
  sections = [
    { id: 1, name: 'Section 1' },
    { id: 2, name: 'Section 2' },
    { id: 3, name: 'Section 3' },
    { id: 4, name: 'Section 4' },
    { id: 5, name: 'Section 5' },
    { id: 6, name: 'Section 6' },
    { id: 7, name: 'Section 7' },
    { id: 8, name: 'Section 8' },
    { id: 9, name: 'Section 9' },
    { id: 10, name: 'Section 10' },
    { id: 11, name: 'Section 11' },
    { id: 12, name: 'Section 12' },
    { id: 13, name: 'Section 13' },
    { id: 14, name: 'Section 14' },
    { id: 15, name: 'Section 15' },
    { id: 16, name: 'Section 16' },
    { id: 17, name: 'Section 17' },
    { id: 18, name: 'Section 18' },
    { id: 19, name: 'Section 19' },
    { id: 20, name: 'Section 20' },
    { id: 21, name: 'Section 21' },
    { id: 22, name: 'Section 22' },
    { id: 23, name: 'Section 23' },
    { id: 24, name: 'Section 24' },
    { id: 25, name: 'Section 25' },
    { id: 26, name: 'Section 26' },
    { id: 27, name: 'Section 27' },
    { id: 28, name: 'Section 28' },
    { id: 29, name: 'Section 29' },
    { id: 30, name: 'Section 30' },
    { id: 31, name: 'Section 31' },
    { id: 32, name: 'Section 32' },
    { id: 33, name: 'Section 33' },
    { id: 34, name: 'Section 34' },
    { id: 35, name: 'Section 35' },
    { id: 36, name: 'Section 36' },
    { id: 37, name: 'Section 37' },
    { id: 38, name: 'Section 38' },
    { id: 39, name: 'Section 39' },
  ];
}
