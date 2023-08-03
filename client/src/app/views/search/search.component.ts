import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { ChangeDetectionStrategy } from '@angular/core';
import { Log } from 'src/app/types/log';
import { SearchService } from 'src/app/services/search.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SearchComponent implements OnInit {
  constructor(public searchService: SearchService, private apiService: ApiService) { }

  //page = this.searchService.page;

  //currentPage$ = new BehaviorSubject<number>(1);

  ngOnInit() {
    this.searchService.currentPage$.subscribe((currentPage) => {
      //console.log(currentPage);
      //this.searchService.page = currentPage;
      console.log(this.searchService.currentPage$);
       this.searchService.getSearch().subscribe({
        next: (logs: Log[]) => {
          this.searchService.searchResult = logs;
          //this.searchService.pages = logs.length;
          console.log(logs);
        },
        error: (error: { error: { message: any; }; }) => {
          console.log(error.error.message);
        }
      });
    });
  }

  nextPage() {
    this.searchService.currentPage$.next(this.searchService.currentPage$.value + 1);
  }

  previousPage() {
    if (this.searchService.currentPage$.value > 1) {
      this.searchService.currentPage$.next(this.searchService.currentPage$.value - 1);
    }
  }

}
