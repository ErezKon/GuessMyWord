import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private requests: number = 0;
  private subject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  get isLoading(): Observable<boolean> {
    return this.subject.asObservable();
  }

  increase(message?: string) {
    this.requests++;
    console.log(`Current active requests: ${this.requests} ${message ? message : ''}`);
    this.subject.next(this.requests > 0);
  }

  decrease(message?: string) {
    if (this.requests > 0) {
      this.requests--;
      console.log(`Current active requests: ${this.requests} ${message ? message : ''}`);
    }
    this.subject.next(this.requests > 0);
  }
}
