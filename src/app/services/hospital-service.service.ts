import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IHospitalService } from '../models/hospital-service.model';

@Injectable({
  providedIn: 'root',
})
export class HospitalServiceService {
  private readonly apiUrl = environment.apiUrl + '/service';

  constructor(private http: HttpClient) {}

  add(service: IHospitalService): Observable<string> {
    return this.http
      .post(this.apiUrl, { data: service })
      .pipe(map((res: any) => res.message as string));
  }
}
