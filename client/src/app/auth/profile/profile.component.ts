import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { Log } from 'src/app/types/log';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private apiServce: ApiService, private authService: AuthService, private imageService: ImageService) { }
  user: User | undefined;
  userId!: string;
  userLogs$!: Observable<Log[]>;
  profilePic: any;

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(
      {
        next: (userInfo) => {
          this.user = userInfo;
          this.userId = this.user._id;
          this.profilePic = this.imageService.getImageAsBase64(this.user.img.data.data);
          console.log(this.user._id);
          this.userLogs$ = this.apiServce.getUserLogs(this.userId);
          // this.apiServce.getUserLogs(this.userId).subscribe({
          //   next: (logs) => {
          //     this.userLogs = logs
          //     console.log(this.userLogs);
          //   },
          //   error: (error) => {
          //     console.log(error.error.message);
          //   }
          // });
        },
        error: (error) => {
          console.log(error.error.message);
        }
      });



  }



}
