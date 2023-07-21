import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getLogs().subscribe(
      {
        next: (logs) => {
          console.log({ logs });
        },
        error: (err) => {
          console.error(`Error: ${err}`);
        }
      }
    );
  }
}
