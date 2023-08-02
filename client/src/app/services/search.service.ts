import { Injectable } from '@angular/core';
import { Log } from '../types/log';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchResult:Log[] = [];
  pages!: number;
}
