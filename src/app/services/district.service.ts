import { take, map } from 'rxjs/operators';
import { IDistrict } from './../models/district.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DistrictService {
  constructor(private http: HttpClient) {}

  private readonly apiUrl = environment.apiUrl + '/district';

  getAll(provinceId?: string): Observable<IDistrict[]> {
    return this.http
      .get<IDistrict[]>(
        this.apiUrl + (provinceId ? `?provinceId=${provinceId}` : '')
      )
      .pipe(
        take(1),
        map((res: any) => res.data as IDistrict[])
      );
  }
}
