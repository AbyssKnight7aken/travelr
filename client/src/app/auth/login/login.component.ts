import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router, private sessionService: SessionService) { }

  errorMesssageFromServer!: string;

  loginHandler(loginForm: NgForm): void {
    if (loginForm.invalid) {
      return;
    }

    console.log(loginForm.value);
    
    
    this.authService.login(loginForm.value).subscribe({
      next: (user) => {
        this.sessionService.createSession(user);
        console.log(user);
        //this.router.navigate(['/themes']);
      },
      error: (error) => {
        console.log(error.error.message);
        this.errorMesssageFromServer = error.error.message;
      }
    });
  }

}
