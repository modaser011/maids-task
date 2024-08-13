import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router, private userService: UserService) {}

  onSearch(event: any): void {
    const id = event.target.value;
    if (id) {
      this.userService.getUser(Number(id)).subscribe(
        user => {
          if (user) {
            this.router.navigate([`/user/${id}`]);
          } else {
            alert('No user found with this ID');
          }
        },
        error => {
          alert('No user found with this ID');
        }
      );
    } else {
      this.router.navigate(['/']);
    }
  }
}
