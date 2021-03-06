import { take, map } from 'rxjs/operators';
import { IHospital } from './../models/hospital.model';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(private http: HttpClient) {}

  private readonly apiUrl = environment.apiUrl + '/hospital';

  addNew(hospital: IHospital): Observable<string> {
    return this.http.post(this.apiUrl, { data: hospital }).pipe(
      take(1),
      map((res: any) => res.message as string)
    );
  }

  getAll(): Observable<IHospital[]> {
    return this.http.get<IHospital[]>(this.apiUrl).pipe(take(1));
  }
  getOne(id: string, relations?: string[]): Observable<IHospital> {
    return this.http
      .get(
        this.apiUrl +
          `/${id}${relations ? `?relations=${relations.join(',')}` : ``}`
      )
      .pipe(
        take(1),
        map((res: any) => res.data as IHospital)
      );
  }

  update(hospital: IHospital): Observable<string> {
    return this.http
      .patch(this.apiUrl, { data: hospital })
      .pipe((take(1), map((res: any) => res.message as string)));
  }

  delete(listID: string[]): Observable<string> {
    return this.http.delete(this.apiUrl, { body: { data: listID } }).pipe(
      take(1),
      map((res: any) => res.message as string)
    );
  }
}
