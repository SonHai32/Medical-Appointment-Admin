import { ICountry } from './../models/country.model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly apiUrl = environment.apiUrl + '/country';
  constructor(private http: HttpClient) {}
  getAll(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(this.apiUrl).pipe(
      take(1),
      map((res: any) => res.data as ICountry[])
    );
  }
}
