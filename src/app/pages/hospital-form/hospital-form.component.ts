import { map, take } from 'rxjs/operators';
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

  isNewForm = true;

  hospitalId!: string

  // END DEFINE VARIABLES
  // ----------------------------------------- //

  ngOnInit(): void {
    // this.initValidateForm();
    // this.getCountryList();
    this.handleRouterParam();
  }

  // TODO Handle  param change on router
  handleRouterParam(): void {
    this.activatedRoute.paramMap
      .pipe(
        map((param) => {
          const id: string | null = param.get('id'); // TODO get hospital id from router if current route === 'edit', it will match this logic
          if (id) {
            this.hospitalId = id
            // TODO if match this, it mean current route is 'edit' and we has hospitalId, so we get hospital by id
            return this.hospitalService
              .getOne(id, [
                'ward',
                'ward.district',
                'ward.district.province',
                'ward.district.province.country',
                // TODO get hospital data with 'ward' property has all relation data
              ])
              .pipe(take(1))
              .subscribe(
                (res) => {
                  if (res) {
                    this.isNewForm = false;
                    this.initValidateForm(res); // TODO if we have response valid we call init validate form with hospital param
                  }
                },
                (err) => {
                  if (err) {
                    // TODO if this has error, show error in message and navigate user to form
                    this.nzMessageService.error('B???nh vi???n n??y kh??ng t???n t???i');
                    this.router.navigate(['../../create'], {
                      relativeTo: this.activatedRoute,
                    });
                  }
                }
              );
          } else {
            // TODO this will be return if current router != 'edit' and dont have 'id' param, or this is 'create' router
            return null;
          }
        })
      )
      .subscribe((res) => {
        if (res === null) {
          // TODO this mean current route is 'create' and validateForm will be init without hospital param
          this.isNewForm = true;
          this.initValidateForm();
        } else {
          return;
        }
      });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const hospital: IHospital = {
        name: this.validateForm.controls['name'].value,
        address: this.validateForm.controls['address'].value,
        ward: this.validateForm.controls['ward'].value as IWard,
      };
      if(this.hospitalId){
        hospital['id'] = this.hospitalId // TODO set hospital id value if existed
      }
      if (this.isNewForm) {
        this.hospitalService.addNew(hospital).subscribe(
          (res: string) => {
            this.nzMessageService.success('Th??m th??nh c??ng');
          },
          (err) => {
            this.nzMessageService.error(err);
          }
        );
      } else {
        this.hospitalService.update(hospital).subscribe(
          (res: string) => {
            if (res) {
              this.nzMessageService.success('C???p nh???t th??nh c??ng');
            }
          },
          (err) => {
            if (err) {
              this.nzMessageService.error(err);
            }
          }
        );
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
  /**
   *
   *
   * @param {IHospital} [hospial] passing this param if we need to set value for validate form | defautl all values is null
   * @memberof HospitalFormComponent
   */
  initValidateForm(hospial?: IHospital): void {
    this.validateForm = this.fb.group({
      name: new FormControl(hospial ? hospial.name : null, [
        Validators.required,
        Validators.maxLength(64),
        Validators.minLength(3),
      ]),
      address: new FormControl(hospial ? hospial.address : null, [
        Validators.required,
        Validators.maxLength(150),
        Validators.minLength(15),
      ]),
      country: new FormControl(
        hospial ? hospial.ward.district.province.country : null,
        [Validators.required]
      ),
      province: new FormControl(
        hospial ? hospial.ward.district.province : null,
        [Validators.required]
      ),
      district: new FormControl(hospial ? hospial.ward.district : null, [
        Validators.required,
      ]),
      ward: new FormControl(hospial ? hospial.ward : null, [
        Validators.required,
      ]),
    });

    if (hospial) {
      // TODO because 'ward' is depend on 'district', 'district' depend on 'provice', and 'provice' depend on 'country', so we need to get add list data of them
      this.wardService
        .getWardToCountryList(hospial.ward)
        .subscribe((res: IListWardToCountry) => {
          this.listCountry = res.listCountry;
          this.listProvince = res.listProvice;
          this.listDistrict = res.listDistrict;
          this.listWard = res.listWard;
        });
    } else {
      // TODO just get country list if hospital does not exist, because countryList is the parent
      this.getCountryList();
    }
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
          return 'Vui l??ng nh???p t??n b???nh vi???n';
        } else if (
          this.validateForm.controls[formControl].hasError('maxlength')
        ) {
          return 'T??n b???nh vi???n ch??? t???i ??a 64 k?? t???';
        } else if (
          this.validateForm.controls[formControl].hasError('minlength')
        ) {
          return 'T??n b???nh vi???n qu?? ng???n';
        }
      } else if (formControl === 'address') {
        if (this.validateForm.controls[formControl].hasError('required')) {
          return 'Vui l??ng nh???p ?????a ch??? b???nh vi???n';
        } else if (
          this.validateForm.controls[formControl].hasError('maxlength')
        ) {
          return '?????a ch??? b???nh vi???n ch??? t???i ??a 150 k?? t???';
        } else if (
          this.validateForm.controls[formControl].hasError('minlength')
        ) {
          return '?????a ch??? b???nh vi???n qu?? ng???n';
        }
      } else if (formControl === 'country') {
        if (this.validateForm.controls[formControl].hasError('required')) {
          return 'Vui l??ng l???a ch???n qu???c gia';
        }
      } else if (formControl === 'province') {
        if (this.validateForm.controls[formControl].hasError('required')) {
          return 'Vui l??ng l???a ch???n t???nh th??nh';
        }
      } else if (formControl === 'district') {
        if (this.validateForm.controls[formControl].hasError('required')) {
          return 'Vui l??ng l???a ch???n qu???n huy???n';
        }
      } else {
        if (this.validateForm.controls[formControl].hasError('required')) {
          return 'Vui l??ng l???a ch???n ph?????ng x??';
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
    if (!country) {
      return;
    }
    this.getProvinceList(country.id);
  }

  // TODO Handle and get province values while value change, then get district list by provinceId
  onProvinceChange(province: IProvince): void {
    this.validateForm.controls['district'].setValue(null);
    this.validateForm.controls['ward'].setValue(null);
    if (!province) {
      return;
    }
    this.getDistrictList(province.id);
  }

  // TODO Handle and get district values while value change, then get ward list by districtId
  onDistrictChange(district: IDistrict): void {
    this.validateForm.controls['ward'].setValue(null);
    if (!district) {
      return;
    }
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
