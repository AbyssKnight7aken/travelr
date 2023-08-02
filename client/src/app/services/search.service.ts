import { Injectable } from '@angular/core';
import { Log } from '../types/log';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private apiService: ApiService) { }
  searchParam!: string;
  itemsPerPage: number = 6;
  searchResult: Log[] = [];
  pages!: number;

  calcPageCount(): number {
    // const count = this.pages;
    // let pageCount = 0;
    // if (count % this.itemsPerPage === 0) {
    //   pageCount = count / this.itemsPerPage;
    // } else {
    //   pageCount = Math.floor(count / this.itemsPerPage) + 1;
    // }
    // console.log('page count -',pageCount);
    // return pageCount;
    return this.pages
  }
    
  page!: number;
  getSearch(): any {
    return this.apiService.getSearchResult(this.searchParam, this.page);
  }
}
