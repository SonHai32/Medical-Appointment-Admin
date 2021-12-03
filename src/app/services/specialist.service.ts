import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ISpecialist } from '../models/specialist.model';

@Injectable({
  providedIn: 'root',
})
export class SpecialistService {
  private readonly apiUrl = environment.apiUrl + '/specialist';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ISpecialist[]> {
    return this.http.get(this.apiUrl).pipe(
      take(1),
      map((res: any) => res.data as ISpecialist[])
    );
  }
}
