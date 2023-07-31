import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Log } from 'src/app/types/log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent  {
  constructor(private apiService: ApiService) { }

  currentPage$ = new BehaviorSubject<number>(1);
  //currentPageLogs$!: Observable<Log[]>;

    currentPageLogs$ = this.currentPage$.pipe(
      switchMap((currentPage) => this.apiService.getLogs(currentPage))
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
