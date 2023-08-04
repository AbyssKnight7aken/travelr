import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
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
  constructor(private apiService: ApiService, private authService: AuthService, private imageService: ImageService) { }
  user: User | undefined;
  userId!: string;
  pages!: number;
  userLogs$!: any;
  profilePic: any;
  currentPage$ = new BehaviorSubject<number>(1);


  // ngOnInit() {
  //   this.searchService.currentPage$.subscribe((currentPage) => {
  //     //console.log(currentPage);
  //     //this.searchService.page = currentPage;
  //     console.log(this.searchService.currentPage$);
  //      this.searchService.getSearch().subscribe({
  //       next: (logs: Log[]) => {
  //         this.searchService.searchResult = logs;
  //         //this.searchService.pages = logs.length;
  //         console.log(logs);
  //       },
  //       error: (error: { error: { message: any; }; }) => {
  //         console.log(error.error.message);
  //       }
  //     });
  //   });
  // }

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe({
      next: (userInfo) => {
        this.user = userInfo;
        this.userId = this.user._id;
        this.profilePic = this.imageService.getImageAsBase64(this.user.img.data.data);
        console.log(this.user._id);
        this.currentPage$.subscribe((currentPage) => {
          this.apiService.getUserLogs(this.userId, currentPage).subscribe({
            next: (result) => {
              this.userLogs$ = result.userLogs;
              this.pages = result.pageCount;
            },
            error: (error) => {
              console.log(error.error.message);
            }
          });
        }); // <- Missing closing parenthesis for the inner subscribe block
      },
      error: (error) => {
        console.log(error.error.message);
      }
    });
  }


  // currentPageLogs$ = this.currentPage$.pipe(
  //   switchMap((currentPage) => this.apiService.getUserLogs(this.userId, currentPage))
  // );

  nextPage() {
    this.currentPage$.next(this.currentPage$.value + 1);
  }

  previousPage() {
    if (this.currentPage$.value > 1) {
      this.currentPage$.next(this.currentPage$.value - 1);
    }
  }
}
