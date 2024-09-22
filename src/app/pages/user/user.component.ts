import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/types/user.types';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  users: User[] = [];

  constructor(private usersService: UserService) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((res) => {
      this.users = res.data;
    });
  }
}
