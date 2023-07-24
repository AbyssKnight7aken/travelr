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
export class RegisterComponent {
  constructor( private authService: AuthService, private router: Router, private sessionServise: SessionService) { }

  errorMesssageFromServer!: string;
  validateEmail:boolean = true;
  url: string = '/assets/images/default_image.png';
  selectedFile: any
  fileName: string = '';

  loadFile(event: any): void {

    if (event.target.files) {
      const reader = new FileReader();
      this.selectedFile = <File>event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target?.result;
      }
    }
  }


  registerHandler(registerForm: NgForm): void {

    if (registerForm.invalid) {
      return;
    }

    if (this.selectedFile) {
      console.log(this.selectedFile);
      this.fileName = this.selectedFile.name;
    }

    registerForm.value.img = this.selectedFile;
    console.log(registerForm.value);

    const formData = new FormData();
    formData.append('username', registerForm.value.username);
    formData.append('email', registerForm.value.email);
    formData.append('password', registerForm.value.password);
    formData.append('img', this.selectedFile);

    // const { username, email, password, repass } = registerForm.value;


    // const body: createUserData = {
    //   username,
    //   email,
    //   password,
    //   repass
    // }
    // console.log(registerForm.value);

    this.authService.register(formData as unknown as createUserData).subscribe({
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
