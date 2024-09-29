import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/types/user.types';
import { UserService } from '../../shared/services/user.service';
import { BehaviorSubject, finalize } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  userSource = new BehaviorSubject<User[]>([]);
  users$ = this.userSource.asObservable();
  isLoading = false;

  displayedColumns: string[] = ['name', 'email', 'role'];
  dataSource!: MatTableDataSource<User>;

  constructor(private usersService: UserService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.loadUsers();
  }

  loadUsers() {
    this.usersService
      .getUsers()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          // console.table(res.data);
          this.userSource.next(res.data);
          this.dataSource = new MatTableDataSource(res.data);
          // get name, email, role from each user
          // const users = res.data.map((user: User) => ({
          //   name: user.name,
          //   email: user.email,
          //   role: user.role,
          // }));
          // this.userSource.next(users);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
