import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Log } from 'src/app/types/log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  constructor(private apiService: ApiService) { }
  logs: Log[] | null = [];
  ngOnInit(): void {
    this.apiService.getLogs().subscribe(
      {
        next: (logs) => {
          console.log({ logs });
          this.logs = logs;
        },
        error: (error) => {
          console.log(error.error.message);
        }
      }
    );
  }
}
