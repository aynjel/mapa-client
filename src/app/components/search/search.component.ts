import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Output() search = new EventEmitter<string>();

  constructor() {}

  onSubmitSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.search.emit(filterValue);
  }
}
