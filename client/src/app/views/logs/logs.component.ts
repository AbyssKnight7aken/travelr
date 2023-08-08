import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Log } from 'src/app/types/log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  constructor(private apiService: ApiService) { }

  logs!: Log[];
  pages!: number;
  isLoading: boolean = true;
  showPagination: boolean = false;

  ngOnInit(): void {
    this.apiService.getCount().subscribe(
      {
        next: (result) => {

          this.pages = result;
          console.log(result);
        },
        error: (error) => {
          console.log(error.error.message);
        }
      }
    );
  }


  currentPage$ = new BehaviorSubject<number>(1);

  currentPageLogs$ = this.currentPage$.pipe(
    switchMap((currentPage) => this.apiService.getLogs(currentPage))
  ).subscribe(
    {
      next: (result) => {
        this.logs = result;
        console.log(this.logs);
        this.isLoading = false;
        this.showPagination = true;
      },
      error: (error) => {
        console.log(error.error.message);
      }
    }
  )

  nextPage() {
    this.currentPage$.next(this.currentPage$.value + 1);
  }

  previousPage() {
    if (this.currentPage$.value > 1) {
      this.currentPage$.next(this.currentPage$.value - 1);
    }
  }

}


