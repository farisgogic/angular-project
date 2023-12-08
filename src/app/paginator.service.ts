import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginatorService {
  private itemsPerPageSubject = new BehaviorSubject<number>(10);
  itemsPerPage$ = this.itemsPerPageSubject.asObservable();

  setItemsPerPage(itemsPerPage: number): void {
    this.itemsPerPageSubject.next(itemsPerPage);
  }
}
