import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router, private sessionService: SessionService) { }

  get isLoggedIn(): boolean {
    return this.sessionService.hasUser;
  }

  get user():User {
    const user = this.sessionService.getUserData();
    //console.log(user);
    return user;

  }
  
  isOpen: boolean = false;

  onBtnClick():void {
    //console.log(this.isOpen);
    this.isOpen = !this.isOpen;
  }

  logoutHandler(): void {
    this.authService.logout().subscribe({
      next: (data) => {
        //console.log(data);
        this.sessionService.clearSession();
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
