import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
const AUTH_API = 'http://localhost:8080/data';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + '/login',
      {
        username,
        password,
      },
      httpOptions
    );
  }
  register(username: string, email: string, password: string, firstName: string, lastName: string, address: string, phone: number): Observable<any> {
    return this.http.post(
      AUTH_API + '/add',
      {
        username,
        email,
        password,
        firstName,
        lastName, 
        address,
        phone
      },
      httpOptions
    );
  }
  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  }
}
