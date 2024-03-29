import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private isSidenavCollapsed: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  readonly isSidenavCollapsed$: Observable<boolean> =
    this.isSidenavCollapsed.asObservable();

  toggleSidenav(): void {
    this.isSidenavCollapsed.next(!this.isSidenavCollapsed.value);
  }
}
