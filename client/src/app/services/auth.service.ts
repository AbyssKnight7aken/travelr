import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../types/user';
import { environment } from 'src/environments/environment';
import { createUserData } from '../types/createUserData';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private sessionService: SessionService) { }

  //token: any = this.sessionService.getToken();
  //headers = new HttpHeaders({ 'x-authorization': this.token.accessToken });
  //   if (this.token != null) {
  //     options.headers['X-Authorization'] = token;
  // }

  register(userData: createUserData): Observable<User> {
    return this.httpClient.post<User>(`${environment.appUrl}/users/register`, userData);
  }

  login(userData: createUserData): Observable<User> {
    return this.httpClient.post<User>(`${environment.appUrl}/users/login`, userData);
  }

  logout() {
    return this.httpClient.get(`${environment.appUrl}/users/logout`);
  }
}
