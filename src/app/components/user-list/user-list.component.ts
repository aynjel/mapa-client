import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../shared/types/user.types';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  @Input() users: Pick<User, 'name' | 'email' | 'role'>[] = [];
  @Input() isLoading: boolean = false;

  displayedColumns: string[] = ['name', 'email', 'role'];
  dataSource: MatTableDataSource<Pick<User, 'name' | 'email' | 'role'>>;

  inputValue = '';

  constructor() {
    this.dataSource = new MatTableDataSource([
      {
        name: 'test1',
        email: 'test1@gmail.com',
        role: 'student',
      },
    ]);
  }

  ngOnInit(): void {
    console.log(this.users);

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.inputValue = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
