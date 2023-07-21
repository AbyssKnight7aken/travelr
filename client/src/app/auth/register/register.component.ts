import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';
import { createUserData } from 'src/app/types/createUserData';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMesssageFromServer!: string;
  validateEmail:boolean = true;



  constructor( private authService: AuthService, private router: Router, private sessionServise: SessionService) { }

  ngOnInit(): void {
  }



  registerHandler(registerForm: NgForm): void {

    if (registerForm.invalid) {
      return;
    }
    const { username, email, password, repass } = registerForm.value;


    const body: createUserData = {
      username,
      email,
      password,
      repass
    }
    console.log(registerForm.value);

    this.authService.register(body).subscribe({
      next: (newUser) => {
        console.log(newUser);
        this.sessionServise.createSession(newUser);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log(error.error.message);
        this.errorMesssageFromServer = error.error.message;
      }
    });
  }
}
