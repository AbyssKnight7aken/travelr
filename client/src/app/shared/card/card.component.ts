import { Component, Input } from '@angular/core';
import { Log } from 'src/app/types/log';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  constructor( ){}
  @Input() log!: any;

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
