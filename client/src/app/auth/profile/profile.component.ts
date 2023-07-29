import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { SessionService } from 'src/app/services/session.service';
import { Log } from 'src/app/types/log';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private apiServce: ApiService, private authService: AuthService, private imageService: ImageService) { }
  user!: User;
  userLogs: Log[] = [];
  avatar: any;

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(
      {
        next: (userInfo) => {
          this.user = userInfo;
          this.avatar = this.imageService.getImageAsBase64(this.user.img.data.data);
          console.log(this.user);
          this.apiServce.getUserLogs(this.user._id).subscribe(
            {
              next: (logs) => {
                this.userLogs = logs;
                console.log(this.userLogs);
              },
              error: (error) => {
                console.log(error.error.message);
              }
            }
          );
        },
        error: (error) => {
          console.log(error.error.message);
        }
      }
    );


  }



}
