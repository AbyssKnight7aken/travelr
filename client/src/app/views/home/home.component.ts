import { Component } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component'
import { ApiService } from 'src/app/services/api.service';
import { Log } from 'src/app/types/log';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private apiService: ApiService, private router: Router) { }
  rescentLogs!: Log[];
  
  ngOnInit(): void {
    this.apiService.getLogs().subscribe(
      {
        next: (logs) => {
          this.rescentLogs = logs;
          console.log(this.rescentLogs);
        },
        error: (err) => {
          console.error(`Error: ${err}`);
        }
      }
    );
  }
}
