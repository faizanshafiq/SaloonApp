import { Injectable } from '@angular/core';
import {BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProgressBar {
  show:boolean;

  private messageSource = new BehaviorSubject(this.show);
  currentMessage = this.messageSource.asObservable();
  constructor() { }

  changeMessage(message: boolean) {
    this.messageSource.next(message)
  }
}
