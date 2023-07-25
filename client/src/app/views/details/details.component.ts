import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Log } from 'src/app/types/log';
import { SessionService } from 'src/app/services/session.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute, private sessionService: SessionService) { }

  get isLoggedIn(): boolean {
    return this.sessionService.hasUser;
  }

  get user():User {
    const user = this.sessionService.getUserData();
    console.log(user._id);
    return user;

  }
  
  log: any
  avatar: string | undefined;
  image: string | undefined;
  isOwner:Boolean = false;

  like(): void {
    console.log('like');

  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['logId'];
    this.apiService.getDetails(id).subscribe(
      {
        next: (result) => {
          this.log = result;
          this.avatar = this.getImageAsBase64(this.log._ownerId.img.data.data);
          this.image = this.getImageAsBase64(this.log.img.data.data);
          this.user;
          this.isOwner = this.user._id === this.log._ownerId._id;
          console.log(this.isOwner);
          console.log(this.log);
        },
        error: (err) => {
          console.error(`Error: ${err}`);
        }
      }
    );
  }

  getImageAsBase64(file: any): string {
    let binary = '';
    const bytes = new Uint8Array(file);

    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  deleteLog(LogId: string) {
    this.apiService.deleteByLogId(LogId).subscribe({
      error: (err) => {
        console.error(`Error: ${err}`);
      },
      complete: () => this.router.navigate(['home'])
    });
}

}
