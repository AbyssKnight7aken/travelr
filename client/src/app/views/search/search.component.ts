import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChangeDetectionStrategy } from '@angular/core';
import { Log } from 'src/app/types/log';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SearchComponent  {
  constructor(public searchService: SearchService) { }
  
  currentPageLogs$ = this.searchService.searchResult;
  pages = this.searchService.pages;
  
  currentPage$ = new BehaviorSubject<number>(1);

  nextPage() {
    this.currentPage$.next(this.currentPage$.value + 1);
  }

  previousPage() {
    if (this.currentPage$.value > 1) {
      this.currentPage$.next(this.currentPage$.value - 1);
    }
  }
}
