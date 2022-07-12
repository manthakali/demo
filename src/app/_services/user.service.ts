import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

const API_URL = 'http://localhost:8080/data';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  login(userName:string,password:string){
   // const headers = new HttpHead({ Authorization: 'Basic ' + btoa(userName + ':' + password) });
    return this.http.post(API_URL + '/login', { responseType: 'text'});
  }
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }
  getUsers(): Observable<any> {
    return this.http.get(API_URL + '/users', { responseType: 'text' });
  }
  
 getAdmin(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  // public getUser():Observable<User[]>{
  //   return this.http.get<User[]>(`${API_URL}/user`);
  // }
  public getUserById(userId:number):Observable<User>{
    return this.http.get<User>(`${API_URL}/user/${userId}`);
  }
  public addUser(user:User):Observable<User>{
    return this.http.post<User>(`${API_URL}/add`,user);
  }
  public updateUser(user:User):Observable<User>{
    return this.http.put<User>(`${API_URL}/update`,user);
  }
  public deleteUser(userId:number):Observable<void>{
    return this.http.delete<void>(`${API_URL}/delete/${userId}`);
  }
}
