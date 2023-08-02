import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
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
    //console.log(user);
    return user;

  }

  isOpen: boolean = false;

  onBtnClick(): void {
    //console.log(this.isOpen);
    this.isOpen = !this.isOpen;
  }

  searchHandler(): void {
    console.log(this.searchInput);
    this.apiService.getSearchResult(this.searchInput).subscribe(
      {
        next: (logs) => {
          this.searchService.searchResult = logs;
          this.searchService.pages = logs.length;
          console.log(logs);
          console.log(logs.length);
          //this.router.navigate(['/search'], { state: { searchInput: this.searchInput, searchResult: searchResult, pages: pages } });
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
        //console.log(data);
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
