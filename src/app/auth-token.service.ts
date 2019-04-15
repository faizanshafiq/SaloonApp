import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  private token:string
  private tokenSource = new BehaviorSubject(this.token);
  
  currentToken = this.tokenSource.asObservable();
  
  constructor() { }

  changeToken(token: string) {
    this.tokenSource.next(token)
  }
  
}


