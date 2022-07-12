import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';


const API_URL = 'http://localhost:8080/data';

@Injectable({
  providedIn: 'root'
})
export class ProfileserviceService {
  public users:User[]=[];
  
 username = sessionStorage.getItem('username');
  constructor(private http:HttpClient) { }

  public getProfileByUserName(username:string):Observable<User>{
    return this.http.get<User>(`${API_URL}/myprofile/${username}`);
  }

  public editProfile(user: User):Observable<User>{
    return this.http.put<User>(`${API_URL}/editprofile`, user);

  }
}
