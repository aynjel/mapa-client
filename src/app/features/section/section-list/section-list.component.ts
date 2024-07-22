import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { SectionInterface } from '../interface/Section.interface';
import { Store } from '@ngrx/store';

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
  templateUrl: './section-list.component.html',
  styleUrl: './section-list.component.scss',
})
export class SectionListComponent implements OnInit {
  private store: Store<{ movies: SectionInterface[] }> = inject(Store);

  movies$: Observable<SectionInterface[]> = this.store.select(
    (state) => state.movies
  );

  ngOnInit(): void {
    this.store.dispatch({ type: 'GET_MOVIES' });
    console.log('Movies:', this.movies$);
  }
}
