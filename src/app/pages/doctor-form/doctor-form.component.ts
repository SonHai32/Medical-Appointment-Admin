import { DoctorService } from './../../services/doctor.service';
import { AcademicRankService } from './../../services/academic-rank.service';
import { combineLatest } from 'rxjs';
import { IAcademicRank } from './../../models/academic-rank.model';
import { IHospital } from './../../models/hospital.model';
import { IWard } from './../../models/ward.model';
import { IDistrict } from './../../models/district.model';
import { IProvince } from './../../models/province.model';
import { Component, OnInit } from '@angular/core';
import { ICountry } from 'src/app/models/country.model';
import { IGender } from 'src/app/models/gender.model';
import { ISpecialist } from 'src/app/models/specialist.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IDoctor } from 'src/app/models/doctor.model';
import { CountryService } from 'src/app/services/country.service';
import { ProvinceService } from 'src/app/services/province.service';
import { DistrictService } from 'src/app/services/district.service';
import { WardService } from 'src/app/services/ward.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecialistService } from 'src/app/services/specialist.service';
import { GenderService } from 'src/app/services/gender.service';

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.scss'],
})
export class DoctorFormComponent implements OnInit {
  listCountry: ICountry[] = [];

  listProvince: IProvince[] = [];

  listDistrict: IDistrict[] = [];

  listWard: IWard[] = [];

  listGender: IGender[] = [];

  listHospital: IHospital[] = [];

  listAcademicRank: IAcademicRank[] = [];

  listSpecialist: ISpecialist[] = [];

  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private provinceService: ProvinceService,
    private districtService: DistrictService,
    private wardService: WardService,
    private hospitalService: HospitalService,
    private academicRankService: AcademicRankService,
    private specialistService: SpecialistService,
    private genderService: GenderService,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.initValidateForm();
    this.getCountryList();
    this.getAllSelectList();
  }

  onSubmit(): void {
    if (this.validateForm.valid) {
      const v = (c: string): any => {
        return this.validateForm.controls[c].value;
      };

      const doctor: IDoctor = {
        firstname: v('firstname') as string,
        middlename: v('middlename') as string,
        lastname: v('lastname') as string,
        birthday: v('birthday') as Date,
        emailAddress: v('emailAddress') as string,
        phoneNumber: v('phoneNumber') as string,
        address: v('address') as string,
        citizenIdentification: v('citizenIdentification') as string,
        academicRank: v('academicRank') as IAcademicRank[],
        specialist: v('specialist') as ISpecialist,
        hospital: v('hospital') as IHospital,
        gender: v('gender') as IGender,
        ward: v('ward') as IWard,
        startAt: v('startAt') as Date
      };

      this.doctorService.add(doctor).subscribe(
        (res: string) => console.log(res),
        (err) => console.log(err)
      );
    } else {
      this.checkValidateForm();
    }
  }

  checkValidateForm() {
    Object.values(this.validateForm.controls).forEach((c) => {
      c.markAsDirty();
      c.updateValueAndValidity();
    });
  }

  initValidateForm(doctor?: IDoctor) {
    this.validateForm = this.fb.group({
      firstname: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20),
      ]),

      middlename: new FormControl(null, [Validators.maxLength(20)]),

      lastname: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20),
      ]),

      birthday: new FormControl(null, [Validators.required]),

      gender: new FormControl(null, [Validators.required]),

      citizenIdentification: new FormControl(null, [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(12),
      ]),

      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(10),
      ]),

      emailAddress: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),

      address: new FormControl(null, [Validators.required]),

      specialist: new FormControl([], [Validators.required]),

      academicRank: new FormControl(null, [Validators.required]),

      hospital: new FormControl(null, [Validators.required]),

      country: new FormControl(null, Validators.required),

      province: new FormControl(null, Validators.required),

      district: new FormControl(null, Validators.required),

      ward: new FormControl(null, Validators.required),

      startAt: new FormControl(null, [Validators.required]),
    });
  }

  getErrorTooltips(
    formControl:
      | 'firstname'
      | 'middlename'
      | 'lastname'
      | 'birthday'
      | 'gender'
      | 'citizenIdentification'
      | 'emailAddress'
      | 'phoneNumber'
      | 'specialist'
      | 'academicRank'
      | 'hospital'
      | 'country'
      | 'province'
      | 'district'
      | 'ward'
  ): string {
    switch (formControl) {
    }
    return '';
  }

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
    this.countryService.getAll().subscribe((res) => {
      this.listCountry = res;
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

  getProvinceList(countryId?: string) {
    this.provinceService.getAll(countryId).subscribe((res: IProvince[]) => {
      this.listProvince = res;
    });
  }

  getDistrictList(provinceId?: string): void {
    this.districtService.getAll(provinceId).subscribe((res: IDistrict[]) => {
      this.listDistrict = res;
    });
  }

  getWardList(districtId?: string): void {
    this.wardService.getAll(districtId).subscribe((res: IWard[]) => {
      this.listWard = res;
    });
  }

  getAllSelectList(): void {
    combineLatest([
      this.hospitalService.getAll(),
      this.academicRankService.getAll(),
      this.specialistService.getAll(),
      this.genderService.getAll(),
    ]).subscribe((res) => {
      this.listHospital = res[0];
      this.listAcademicRank = res[1];
      this.listSpecialist = res[2];
      this.listGender = res[3];
      console.log(res);
    });
  }
}
