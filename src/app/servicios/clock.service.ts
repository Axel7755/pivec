import { Injectable } from '@angular/core';
import { Observable, interval, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClockService {
  private clock$: Observable<Date>;
  private idmat: string = '';
  private idgrupo: string = '';
  private idsSubject: Subject<{ idmat: string, idgrupo: string }> = new Subject();

  constructor() {
    this.clock$ = interval(1000).pipe(map(() => new Date()));
  }

  getClock(): Observable<Date> {
    return this.clock$;
  }

  addId(idmat: string, idgrupo: string): void {
    this.idmat = idmat;
    this.idgrupo = idgrupo;
    this.idsSubject.next({ idmat: this.idmat, idgrupo: this.idgrupo });
  }

  getIds(): Observable<{ idmat: string, idgrupo: string }> {
    return this.idsSubject.asObservable();
  }
}