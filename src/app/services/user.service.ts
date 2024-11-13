import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL = "http://localhost:3000/users";

  constructor(private http : HttpClient) { }


  getUsers():Observable<any>{
  return this.http.get(this.apiURL);
  }

  getUserbyId(id : number):Observable<any>{
    return this.http.get(`${this.apiURL}/${id}`)
  }

  deleteById(id : number): Observable<any>{
    return this.http.delete(this.apiURL + '/' + id);
  }
  
  addUser(user : User): Observable<any>{

    const headers = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }

    return this.http.post(this.apiURL, user, headers);
  }
  
  editUser(user : User): Observable<any>{
     const headers = new HttpHeaders({
      'Content-type' : 'application/json'
     })

     return this.http.put(`${this.apiURL}/${user.id}`, user, {headers});

  }
  


}
