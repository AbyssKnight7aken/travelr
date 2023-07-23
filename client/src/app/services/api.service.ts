import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Log } from '../types/log';
import { Post } from '../types/post';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data', 'enctype': 'multipart/form-data'});

  getLogs() {
    const {appUrl} = environment;
    return this.http.get<Log[]>(`${appUrl}/logs`);
  }

  getRescentLogs() {
    const {appUrl} = environment;
    return this.http.get<Log[]>(`${appUrl}/logs/rescent`);
  }

  getDetails(id:any) {
    const {appUrl} = environment;
    return this.http.get<any>(`${appUrl}/logs/${id}`);
  }
  
  getPosts(limit?: number) {
    const {appUrl} = environment;
    const limitFilter = limit ? `?limit=${limit}` : '';
    return this.http.get<Post[]>(`${appUrl}/posts${limitFilter}`);
  }

  create(body: Log) {
    const {appUrl} = environment;
    //return this.http.post<Log>(`${appUrl}/logs`, body, { headers: this.headers});
    return this.http.post<Log>(`${appUrl}/logs`, body);
  }

  // addTheme$(body: { themeName: string, postText: string }): Observable<ITheme> {
  //   return this.http.post<ITheme>(`${apiUrl}/themes`, body, { withCredentials: true });
  // }
}
