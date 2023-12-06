import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  fromEvent,
  from,
  mergeMap,
  throttleTime,
  filter,
  map,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LastActiveService {
  private recordTimeoutMs = 500;
  public lsLastActiveKey = '__lastActive';
  private events: string[] = ['keydown', 'click', 'wheel', 'mousemove'];

  private _lastActive: BehaviorSubject<Date>;
  public lastActive$: Observable<Date>;

  constructor() {
    const lastActiveDate = this.getLastActiveFromLocalStorage() ?? new Date();
    this._lastActive = new BehaviorSubject<Date>(lastActiveDate);
    this.lastActive$ = this._lastActive.asObservable();
  }

  public setUp() {
    from(this.events)
      .pipe(
        mergeMap((event) => fromEvent(document, event)),
        throttleTime(this.recordTimeoutMs)
      )
      .subscribe(() => this.recordLastActiveDate());

    fromEvent<StorageEvent>(window, 'storage')
      .pipe(
        filter(
          (event) =>
            event.storageArea === localStorage &&
            event.key === this.lsLastActiveKey &&
            !!event.newValue
        ),
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        map((event) => new Date(event.newValue!))
      )
      .subscribe((newDate) => this._lastActive.next(newDate));
  }

  public getLastActiveDate(): Date {
    return this._lastActive.value;
  }

  private recordLastActiveDate() {
    const currentDate = new Date();
    localStorage.setItem(this.lsLastActiveKey, currentDate.toString());
    this._lastActive.next(currentDate);
  }

  private getLastActiveFromLocalStorage(): Date | null {
    const valueFromStorage = localStorage.getItem(this.lsLastActiveKey);
    if (!valueFromStorage) {
      return null;
    }

    return new Date(valueFromStorage);
  }
}
