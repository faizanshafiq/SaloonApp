import { Injectable, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { HttpHeaders } from '@angular/common/http';
import { Employee } from './Employee';
import { stringify } from '@angular/core/src/render3/util';
import {AuthTokenService} from '../../auth-token.service';
import { parseIntAutoRadix } from '@angular/common/src/i18n/format_number';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeCRUDService  implements OnInit{
  
  
  Token:string;
  API_ADDRESS:string = 'http://localhost:13378';
  httpOptions={ headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
  
  constructor(private http:HttpClient,private authTokenService:AuthTokenService) { }

  ngOnInit(): void {
   }

  public addEditEmployee(emp: Employee): Observable<any> {
    if (!this.httpOptions.headers.has('Token') && localStorage.length>0) 
    {
      this.Token = localStorage.getItem('Token');
      this.httpOptions.headers = this.httpOptions.headers.append('Token', this.Token);
    }
    console.log('service callled  ' + this.Token)
    console.log(this.httpOptions)
  
    return this.http.post<any>(this.API_ADDRESS + '/api/AddOrEditEmployee',emp,this.httpOptions
      )
    }

  public removeEmployee(id:number) : Observable<JSON>
  {
    if (!this.httpOptions.headers.has('Token') && localStorage.length>0) 
    {
      this.Token = localStorage.getItem('Token');
      this.httpOptions.headers = this.httpOptions.headers.append('Token', this.Token);
    }
    
    return this.http.get<JSON>(this.API_ADDRESS+'/api/RemoveEmployee/'+id,this.httpOptions
        );
  }

  public getEmployee(id:number) : Observable<Employee>
  {
    if (!this.httpOptions.headers.has('Token') && localStorage.length>0) 
    {
      this.Token = localStorage.getItem('Token');
      this.httpOptions.headers = this.httpOptions.headers.append('Token', this.Token);
    }
    return this.http.get<Employee>(this.API_ADDRESS+'/api/getEmployeeById/'+id,this.httpOptions);
  }
  public getAllEmployees( page:number=1,pageItems:number=5) : Observable<Employee[]>
  {
    return this.http.get<Employee[]>(this.API_ADDRESS+'/api/ShowAllEmployees/'+page+'/'+pageItems,this.httpOptions);
  }
  public getPaginInfo():Observable<string>
  {
    return this.http.get<string>(this.API_ADDRESS+'/api/getPaginInfo/');
  }
 
}
