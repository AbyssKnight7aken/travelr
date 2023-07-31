import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Log } from '../types/log';
import { Post } from '../types/post';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  appUrl = environment.appUrl;
  // headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data', 'enctype': 'multipart/form-data'});

  getCount() {
    return this.http.get<number>(`${this.appUrl}/logs/count`);
  }

  getLogs(page: number) {
    return this.http.get<Log[]>(`${this.appUrl}/logs?page=${page}`);
  }

  getRescentLogs() {
    return this.http.get<Log[]>(`${this.appUrl}/logs/rescent`);
  }

  getDetails(id: any) {
    return this.http.get<any>(`${this.appUrl}/logs/${id}`);
  }

  getUserLogs(userId: string): Observable<Log[]> {
    return this.http.get<Log[]>(`${this.appUrl}/logs?where=_ownerId%3D%22${userId}%22`);
  }

  create(body: Log) {
    //return this.http.post<Log>(`${appUrl}/logs`, body, { headers: this.headers});
    return this.http.post<Log>(`${this.appUrl}/logs`, body);
  }

  edit(id: string, body: Log) {
    return this.http.put<any>(`${this.appUrl}/logs/${id}`, body);
  }

  deleteByLogId(id: string) {
    return this.http.delete<any>(`${this.appUrl}/logs/${id}`);
  }

  // getPosts(limit?: number) {
    
  //   const {appUrl} = environment;
  //   const limitFilter = limit ? `?limit=${limit}` : '';
  //   return this.http.get<Post[]>(`${appUrl}/posts${limitFilter}`);
  // }

  // addTheme$(body: { themeName: string, postText: string }): Observable<ITheme> {
  //   return this.http.post<ITheme>(`${apiUrl}/themes`, body, { withCredentials: true });
  // }
}
