import { Component, Input } from '@angular/core';
import { User } from '../../shared/types/user.types';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  @Input() users: User[] = [];
  @Input() isLoading: boolean = false;

  inputValue: string = '';

  displayedColumns: string[] = ['name', 'email'];
  dataSource = new MatTableDataSource(this.users);

  constructor() {
    console.log(this.users);
  }

  applyFilter(event: string) {
    this.dataSource.filter = event.trim().toLowerCase();
    this.inputValue = event;
  }
}
