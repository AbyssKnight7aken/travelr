import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  constructor(private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute) { }
  searchParam: string = this.activatedRoute.snapshot.queryParams['searchInput'];
  currentPage$ = new BehaviorSubject<number>(1);
  //currentPageLogs$!: Observable<Log[]>;

    currentPageLogs$ = this.currentPage$.pipe(
      switchMap((currentPage) => this.apiService.getSearchResult(this.searchParam, currentPage))
    );

  nextPage() {
    this.currentPage$.next(this.currentPage$.value + 1);
  }

  previousPage() {
    if (this.currentPage$.value > 1) {
      this.currentPage$.next(this.currentPage$.value - 1);
    }
  }
}
