import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Log } from 'src/app/types/log';
import { NgOptimizedImage } from '@angular/common'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) { }

  log:any
  avatar:string | undefined;
  image:string | undefined;

  like(): void {
    console.log('like');
    
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['logId'];
    this.apiService.getDetails(id).subscribe(
      {
        next: (result) => {
          this.log = result;
          this.avatar = this.getImageAsBase64(this.log._ownerId.img.data.data);
          this.image = this.getImageAsBase64(this.log.img.data.data);
          //this.avatar = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.log._ownerId.img.data.data}`);
          
          console.log(this.log);
        },
        error: (err) => {
          console.error(`Error: ${err}`);
        }
      }
    );
  }

  getImageAsBase64(file:any): string {
    let binary = '';
    const bytes = new Uint8Array(file);
    
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
}
