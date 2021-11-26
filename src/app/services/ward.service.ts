import { ICountry } from './../models/country.model';
import { IProvince } from './../models/province.model';
import { IDistrict } from './../models/district.model';
import { DistrictService } from './district.service';
import { take, map } from 'rxjs/operators';
import { IWard } from './../models/ward.model';
import { combineLatest, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProvinceService } from './province.service';
import { CountryService } from './country.service';

export interface IListWardToCountry {
  listWard: IWard[];
  listDistrict: IDistrict[];
  listProvice: IProvince[];
  listCountry: ICountry[];
}

@Injectable({
  providedIn: 'root',
})
export class WardService {
  private readonly apiUrl = environment.apiUrl + '/ward';
  constructor(
    private http: HttpClient,
    private districtService: DistrictService,
    private provineService: ProvinceService,
    private countryService: CountryService
  ) {}

  getAll(districtId?: string): Observable<IWard[]> {
    return this.http
      .get<IWard[]>(
        this.apiUrl + (districtId ? `?districtId=${districtId}` : '')
      )
      .pipe(
        take(1),
        map((res: any) => res.data as IWard[])
      );
  }

  getWardToCountryList(ward: IWard): Observable<IListWardToCountry> {
    return combineLatest([
      this.getAll(ward.district.id),
      this.districtService.getAll(ward.district.province.id),
      this.provineService.getAll(ward.district.province.country.id),
      this.countryService.getAll(),
    ]).pipe(
      take(1),
      map(
        (res) =>
          ({
            listWard: res[0],
            listDistrict: res[1],
            listProvice: res[2],
            listCountry: res[3],
          } as IListWardToCountry)
      )
    );
  }
}
