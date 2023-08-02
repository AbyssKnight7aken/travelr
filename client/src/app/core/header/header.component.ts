import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { SearchService } from 'src/app/services/search.service';
import { SessionService } from 'src/app/services/session.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router, private sessionService: SessionService, private apiService: ApiService, private searchService: SearchService) { }

  searchInput: string = '';
  get isLoggedIn(): boolean {
    return this.sessionService.hasUser;
  }

  get user(): User {
    const user = this.sessionService.getUserData();
    return user;

  }

  isOpen: boolean = false;

  onBtnClick(): void {
    this.isOpen = !this.isOpen;
  }

  searchHandler(): void {
    console.log(this.searchInput);
    this.apiService.getSearchResult(this.searchInput, 1).subscribe(
      {
        next: (logs) => {
          this.searchService.searchParam = this.searchInput;
          this.searchService.searchResult = logs;          
          this.apiService.getSearchCount(this.searchInput).subscribe(
            {
              next: (result) => {
                
                this.searchService.pages = result;
                console.log('pages - ',this.searchService.pages);
              },
              error: (error) => {
                console.log(error.error.message);
              }
            })
          console.log(logs);
          this.router.navigate(['/search']);
        },
        error: (error) => {
          console.log(error.error.message);
        }
      }
    );
  }

  logoutHandler(): void {
    this.authService.logout().subscribe({
      next: (data) => {
        this.sessionService.clearSession();
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error.error.message);
        this.sessionService.clearSession();
        this.router.navigate(['/']);
      }
    });
  }
}
