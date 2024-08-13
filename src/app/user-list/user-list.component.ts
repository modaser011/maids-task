import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  totalPages: number=0;
  currentPage: number = 1;
  isLoading: boolean = false;

constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.fetchUsers(this.currentPage);
  }

  fetchUsers(page: number): void {
    this.isLoading = true;
    this.userService.getUsers(page).subscribe(data => {
      this.users = data.users;
      this.totalPages = data.totalPages;
      this.isLoading = false;
    });
  }

  viewUser(id: number): void {
  this.router.navigate([`/user/${id}`]);  }
}
