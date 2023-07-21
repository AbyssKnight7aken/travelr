import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';
import { emailValidator, passwordMatch, passwordMatch2 } from '../util';
import { createUserData } from 'src/app/types/createUserData';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passwordControl = new FormControl(null, [Validators.required, Validators.minLength(5)]);

  // get passwordsGroup(): FormGroup {
  //   return this.registerFormGroup.controls['passwords'] as FormGroup;
  // }

  registerFormGroup: FormGroup = this.formBuilder.group({
    'username': new FormControl(null, [Validators.required, Validators.minLength(5)]),
    'email': new FormControl(null, [Validators.required, emailValidator]),
    'password': this.passwordControl,
    'repass': new FormControl(null, [passwordMatch(this.passwordControl)]),
  })

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private sessionServise: SessionService) { }

  ngOnInit(): void {
  }

  shouldShowErrorForControl(controlName: string, sourceGroup: FormGroup = this.registerFormGroup) {
    return sourceGroup.controls[controlName].touched && sourceGroup.controls[controlName].invalid
  }

  registerHandler(): void {
    const { username, email, password, repass } = this.registerFormGroup.value;
    
    
    const body: createUserData = {
      username: username,
      email: email,
      password: password,
      repass: repass
    }
    console.log(this.registerFormGroup.value);

    this.authService.register(body).subscribe({
          next: (newUser) => {
        console.log(newUser);
        this.sessionServise.createSession(newUser);
        //this.router.navigate(['/themes']);
      },
      error: (error) => {
        console.error(error);
      }
      //this.router.navigate(['/home']);
    });
  }
}
