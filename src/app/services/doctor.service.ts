import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IDoctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private readonly apiUrl = environment.apiUrl + '/doctor';

  constructor(private http: HttpClient) {}

  add(doctor: IDoctor): Observable<string> {
    return this.http.post(this.apiUrl, { data: doctor }).pipe(
      take(1),
      map((res: any) => res.message as string)
    );
  }
}
