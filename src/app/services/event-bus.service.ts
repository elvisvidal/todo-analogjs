import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  private eventSubject = new Subject<any>();

  // Observable stream
  eventStream$ = this.eventSubject.asObservable();

  // Method to emit events
  emitEvent(data: any) {
    this.eventSubject.next(data);
  }
}
