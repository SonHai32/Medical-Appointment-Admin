import { take, map } from 'rxjs/operators';
import { IGender } from './../models/gender.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GenderService {
  private readonly apiUrl = environment.apiUrl + '/gender';

  constructor(private http: HttpClient) {}

  getAll(): Observable<IGender[]> {
    return this.http.get(this.apiUrl).pipe(
      take(1),
      map((res: any) => res.data as IGender[])
    );
  }
}
