import { map, take, tap } from 'rxjs/operators';
import { IHospital } from './../../models/hospital.model';
import { WardService, IListWardToCountry } from './../../services/ward.service';
import { DistrictService } from './../../services/district.service';
import { IWard } from './../../models/ward.model';
import { IDistrict } from './../../models/district.model';
import { ProvinceService } from './../../services/province.service';
import { IProvince } from './../../models/province.model';
import { CountryService } from './../../services/country.service';
import { ICountry } from './../../models/country.model';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { HospitalService } from 'src/app/services/hospital.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-hospital-form',
  templateUrl: './hospital-form.component.html',
  styleUrls: ['./hospital-form.component.scss'],
})
export class HospitalFormComponent implements OnInit {
  constructor(
    private countryService: CountryService,
    private provinceService: ProvinceService,
    private districtService: DistrictService,
    private wardService: WardService,
    private hospitalService: HospitalService,
    private nzMessageService: NzMessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}
  // START DEFINE VARIABLES
  // ----------------------------------------- //
  validateForm!: FormGroup;

  listCountry!: ICountry[];
  listCountryLoading = false;
  listContrySelected!: ICountry;

  listProvince!: IProvince[];
  listProvinceLoading = false;
  listProvinceSelected!: IProvince;

  listDistrict!: IDistrict[];
  listDistrictLoading = false;
  listDistrictSelected!: IDistrict;

  listWard!: IWard[];
  listWardLoading = false;
  listWardSeleted!: IWard;

  hospitalName = '';
  hospitalAddress = '';

  // END DEFINE VARIABLES
  // ----------------------------------------- //

  ngOnInit(): void {
    // this.initValidateForm();
    // this.getCountryList();
    this.handleRouterParam();
  }

  handleRouterParam(): void {
    this.activatedRoute.paramMap
      .pipe(
        map((param) => {
          const id: string | null = param.get('id');
          if (id) {
            return this.hospitalService
              .getOne(id, [
                'ward',
                'ward.district',
                'ward.district.province',
                'ward.district.province.country',
              ])
              .pipe(take(1))
              .subscribe(
                (res) => {
                  if (res) {
                    this.initValidateForm(res);
                  }
                },
                (err) => {
                  if (err) {
                    this.nzMessageService.error((err as Error).message);
                    this.router.navigate(['../form'], {
                      relativeTo: this.activatedRoute,
                    });
                  }
                }
              );
          } else {
            return null;
          }
        })
      )
      .subscribe((res) => {
        console.log(res);
        if (res === null) {
          this.initValidateForm();
        }
      });
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      try {
        const hospital: IHospital = {
          name: this.validateForm.controls['name'].value,
          address: this.validateForm.controls['address'].value,
          ward: this.validateForm.controls['ward'].value as IWard,
        };
        this.hospitalService.addNew(hospital).subscribe((res: any) => {
          if (res) {
            this.nzMessageService.success('Thêm thành công');
          }
        });
      } catch (error) {
        this.nzMessageService.error((error as Error).message);
      }
    } else {
      this.formChecking();
    }
  }

  // TODO for checking all form value
  formChecking(): void {
    Object.values(this.validateForm.controls).forEach((val) => {
      if (val.invalid) {
        val.markAsDirty();
        val.updateValueAndValidity();
      }
    });
  }

  // TODO Init form group to define default values for formControl and define validators for checking error
  initValidateForm(hospial?: IHospital): void {
    this.validateForm = this.fb.group({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(64),
        Validators.minLength(3),
      ]),
      address: new FormControl(null, [
        Validators.required,
        Validators.maxLength(150),
        Validators.minLength(15),
      ]),
      country: new FormControl(null, [Validators.required]),
      province: new FormControl(null, [Validators.required]),
      district: new FormControl(null, [Validators.required]),
      ward: new FormControl(null, [Validators.required]),
    });

    if (hospial) {
      this.wardService
        .getWardToCountryList(hospial.ward)
        .subscribe((res: IListWardToCountry) => {
          this.listCountry = res.listCountry;
          this.listProvince = res.listProvice;
          this.listDistrict = res.listDistrict;
          this.listWard = res.listWard;

          this.setHospitalValue(hospial);
        });
    } else {
      this.getCountryList();
    }
  }

  setHospitalValue(hospital: IHospital): void {
    this.validateForm.controls['name'].setValue(hospital.name);
    this.validateForm.controls['address'].setValue(hospital.address);
    this.validateForm.controls['country'].setValue(
      hospital.ward.district.province.country
    );
    this.validateForm.controls['province'].setValue(
      hospital.ward.district.province
    );
    this.validateForm.controls['district'].setValue(hospital.ward.district);
    this.validateForm.controls['ward'].setValue(hospital.ward);
  }

  //TODO check and get error tooltips for input form
  getFormErrorTooltips(
    formControl:
      | 'name'
      | 'address'
      | 'country'
      | 'province'
      | 'district'
      | 'ward'
  ): string {
    if (this.validateForm.controls.hasOwnProperty(formControl)) {
      if (formControl === 'name') {
        if (this.validateForm.controls[formControl].hasError('required')) {
          return 'Vui lòng nhập tên bệnh viện';
        } else if (
          this.validateForm.controls[formControl].hasError('maxlength')
        ) {
          return 'Tên bệnh viện chỉ tối đa 64 kí tự';
        } else if (
          this.validateForm.controls[formControl].hasError('minlength')
        ) {
          return 'Tên bệnh viện quá ngắn';
        }
      } else if (formControl === 'address') {
        if (this.validateForm.controls[formControl].hasError('required')) {
          return 'Vui lòng nhập địa chỉ bệnh viện';
        } else if (
          this.validateForm.controls[formControl].hasError('maxlength')
        ) {
          return 'Địa chỉ bệnh viện chỉ tối đa 150 kí tự';
        } else if (
          this.validateForm.controls[formControl].hasError('minlength')
        ) {
          return 'Địa chỉ bệnh viện quá ngắn';
        }
      } else if (formControl === 'country') {
        if (this.validateForm.controls[formControl].hasError('required')) {
          return 'Vui lòng lựa chọn quốc gia';
        }
      } else if (formControl === 'province') {
        if (this.validateForm.controls[formControl].hasError('required')) {
          return 'Vui lòng lựa chọn tỉnh thành';
        }
      } else if (formControl === 'district') {
        if (this.validateForm.controls[formControl].hasError('required')) {
          return 'Vui lòng lựa chọn quận huyện';
        }
      } else {
        if (this.validateForm.controls[formControl].hasError('required')) {
          return 'Vui lòng lựa chọn phường xã';
        }
      }
    }
    return '';
  }

  // TODO Handle and get country values while value change, then get province list by countryId
  onCountryChange(country: ICountry) {
    this.validateForm.controls['province'].setValue(null);
    this.validateForm.controls['district'].setValue(null);
    this.validateForm.controls['ward'].setValue(null);
    this.getProvinceList(country.id);
  }

  // TODO Handle and get province values while value change, then get district list by provinceId
  onProvinceChange(province: IProvince): void {
    this.validateForm.controls['district'].setValue(null);
    this.validateForm.controls['ward'].setValue(null);
    this.getDistrictList(province.id);
  }

  // TODO Handle and get district values while value change, then get ward list by districtId
  onDistrictChange(district: IDistrict): void {
    this.validateForm.controls['ward'].setValue(null);
    this.getWardList(district.id);
  }

  // TODO Call listCountryService for fetching country list from api
  getCountryList(): void {
    this.listCountryLoading = true;
    this.countryService.getAll().subscribe((res) => {
      this.listCountry = res;
      this.listCountryLoading = false;
    });
    this.listCountryLoading = false;
  }

  // TODO Call provinceService for fetching province list from api
  getProvinceList(countryId?: string) {
    this.listProvinceLoading = true; //TODO For start loading in provine-list-select-box
    this.provinceService.getAll(countryId).subscribe((res: IProvince[]) => {
      this.listProvince = res;
      this.listProvinceLoading = false; //TODO For stop loading in provine-list-select-box
    });
  }

  getDistrictList(provinceId?: string): void {
    this.listDistrictLoading = true;
    this.districtService.getAll(provinceId).subscribe((res: IDistrict[]) => {
      this.listDistrict = res;
      this.listDistrictLoading = false;
    });
  }

  getWardList(districtId?: string): void {
    this.listWardLoading = true;
    this.wardService.getAll(districtId).subscribe((res: IWard[]) => {
      this.listWard = res;
      this.listWardLoading = false;
    });
  }

  countryCompareFn(o1: ICountry, o2: ICountry) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  provinceCompareFn(o1: IProvince, o2: IProvince) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  districtCompareFn(o1: IDistrict, o2: IDistrict) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  wardCompareFn(o1: IWard, o2: IWard) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
}
