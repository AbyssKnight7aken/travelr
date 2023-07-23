import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Log } from 'src/app/types/log';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute,) { }

  log:any

  like(): void {
    console.log('like');
    
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['logId'];
    this.apiService.getDetails(id).subscribe(
      {
        next: (result) => {
          this.log = result;

          
          console.log(this.log);
        },
        error: (err) => {
          console.error(`Error: ${err}`);
        }
      }
    );
  }

  getImageAsBase64(): string {
    let binary = '';
    const bytes = new Uint8Array(this.log.img.data.data);
    
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
}
