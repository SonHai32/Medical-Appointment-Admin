import { HospitalServiceService } from './../../services/hospital-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SpecialistService } from 'src/app/services/specialist.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { IHospital } from './../../models/hospital.model';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ISpecialist } from 'src/app/models/specialist.model';
import { combineLatest } from 'rxjs';
import { IHospitalService } from 'src/app/models/hospital-service.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-hospital-service-form',
  templateUrl: './hospital-service-form.component.html',
  styleUrls: ['./hospital-service-form.component.scss'],
})
export class HospitalServiceFormComponent implements OnInit {
  validateForm!: FormGroup;

  listHospital!: IHospital[];

  listSpecialist!: ISpecialist[];

  constructor(
    private fb: FormBuilder,
    private nzMessageService: NzMessageService,
    private hospitalService: HospitalService,
    private specialistService: SpecialistService,
    private hospitalServiceService: HospitalServiceService
  ) {}

  ngOnInit(): void {
    this.initValidateForm();
    this.getListData();
  }

  initValidateForm(): void {
    this.validateForm = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      hospital: new FormControl(null, [Validators.required]),
      specialist: new FormControl(null, [Validators.required]),
    });
  }

  getListData(): void {
    combineLatest([
      this.hospitalService.getAll(),
      this.specialistService.getAll(),
    ]).subscribe(
      (res) => {
        this.listHospital = res[0];
        this.listSpecialist = res[1];
      },
      (err) => console.log(err)
    );
  }

  compareFn(o1: any, o2: any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  onSubmit(): void {
    const v = (c: string): any => {
      return this.validateForm.controls[c].value;
    };
    if (this.validateForm.valid) {
      const service: IHospitalService = {
        hospital: v('hospital') as IHospital,
        specialist: v('specialist') as ISpecialist,
        price: v('price'),
        name: v('name'),
      };
      this.hospitalServiceService.add(service).subscribe(
        () => {
          this.nzMessageService.success('Thêm thành công');
        },
        (err: HttpErrorResponse) => this.nzMessageService.error(err.error)
      );
    } else {
      this.checkValidateForm();
    }
  }

  checkValidateForm(): void {
    Object.values(this.validateForm.controls).forEach((c) => {
      c.markAsDirty();
      c.updateValueAndValidity();
    });
  }
}
