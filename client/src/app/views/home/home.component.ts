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

  // avatar = this.getImageAsBase64(this.log._ownerId.img.data.data);
  // image = this.getImageAsBase64(this.log.img.data.data);
  
  ngOnInit(): void {
    this.apiService.getRescentLogs().subscribe(
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
