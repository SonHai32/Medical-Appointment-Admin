import { take, map } from 'rxjs/operators';
import { IProvince } from './../models/province.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProvinceService {
  private readonly apiUrl = environment.apiUrl + '/province';
  constructor(private http: HttpClient) {}

  getAll(countryId?: string): Observable<IProvince[]> {
    return this.http
      .get<IProvince[]>(
        this.apiUrl + (countryId ? `?countryId=${countryId}` : '')
      )
      .pipe(
        take(1),
        map((res: any) => res.data as IProvince[])
      );
  }
}
