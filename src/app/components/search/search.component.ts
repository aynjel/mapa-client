import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Input() placeholder = 'Search';
  @Output() search = new EventEmitter<any>();

  constructor() {}

  onSubmitSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.search.emit(filterValue);
  }
}
