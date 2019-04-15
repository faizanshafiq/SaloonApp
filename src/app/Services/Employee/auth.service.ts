import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Employee } from './Employee';
import { HttpHeaders } from '@angular/common/http';
import {AuthTokenService} from '../../auth-token.service';
import { tokenKey } from '@angular/core/src/view';
@Injectable(
  {
    providedIn: 'root'
  }
)

export class AuthService implements OnInit{
  
  API_ADDRESS:string = 'http://localhost:13378';
  httpOptions ={ headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
  
  token:string;
  constructor(private http:HttpClient,private authTokenService:AuthTokenService) { }
 
  ngOnInit(): void {
    this.authTokenService.currentToken.subscribe( token => this.token = token )
    this.httpOptions.headers.append('Token','123asdf');
  }

  public authEmployee(userName:string,password:string) :Observable<any>
  {
    console.log('Auth employee service called');

    return this.http.post<any>(this.API_ADDRESS + '/api/AuthEmployees',
     {httpOptions:this.httpOptions} ,
      {
        params:
        {
          username: userName, password: password
        }
      }
    );
  }
  public logOut():Observable<string>
  {
     localStorage.getItem('Token')
     if (!this.httpOptions.headers.has('Token'))
     {
      this.httpOptions.headers = this.httpOptions.headers.append('Token', localStorage.getItem('Token'));
     }
    localStorage.clear();
    return this.http.get<string>(this.API_ADDRESS+'api/RemoveAuthEmployees',this.httpOptions);
  }


 
}
