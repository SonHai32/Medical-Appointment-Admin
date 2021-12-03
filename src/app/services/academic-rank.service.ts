import { take, map } from 'rxjs/operators';
import { IAcademicRank } from 'src/app/models/academic-rank.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AcademicRankService {
  private readonly apiUrl = environment.apiUrl + '/academic-rank';

  constructor(private http: HttpClient) {}

  add(academicRank: IAcademicRank): Observable<string> {
    return this.http.post(this.apiUrl, { data: academicRank }).pipe(
      take(1),
      map((res: any) => res.message as string)
    );
  }

  getAll(): Observable<IAcademicRank[]> {
    return this.http.get(this.apiUrl).pipe(
      take(1),
      map((res: any) => res.data as IAcademicRank[])
    );
  }
}
