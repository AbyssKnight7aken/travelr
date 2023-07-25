import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Log } from '../types/log';
import { Post } from '../types/post';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  appUrl = environment.appUrl;
  // headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data', 'enctype': 'multipart/form-data'});

  getLogs() {
    return this.http.get<Log[]>(`${this.appUrl}/logs`);
  }

  getRescentLogs() {
    return this.http.get<Log[]>(`${this.appUrl}/logs/rescent`);
  }

  getDetails(id: any) {
    return this.http.get<any>(`${this.appUrl}/logs/${id}`);
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
