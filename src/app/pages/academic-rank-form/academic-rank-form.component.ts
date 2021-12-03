import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AcademicRankService } from './../../services/academic-rank.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IAcademicRank } from 'src/app/models/academic-rank.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-academic-rank-form',
  templateUrl: './academic-rank-form.component.html',
  styleUrls: ['./academic-rank-form.component.scss'],
})
export class AcademicRankFormComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private academicRankService: AcademicRankService,
    private nzMessageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.initValidateForm();
  }


  onSumbit(): void {
    if (this.validateForm.valid) {
      const x = (c: string): string => {
        return this.validateForm.controls[c].value;
      };
      const academicRank: IAcademicRank = {
        fullname: x('fullname'),
        shortname: x('shortname'),
        description: x('description'),
      };

      this.academicRankService.add(academicRank).subscribe(
        (res: string) => {
          this.nzMessageService.success('Thêm thành công');
        },
        (err: HttpErrorResponse) =>
          this.nzMessageService.error(err.error)
      );
    } else {
      this.checkValidateForm();
    }
  }

  checkValidateForm(): void {
    Object.values(this.validateForm.controls).forEach((v) => {
      v.markAsDirty();
      v.updateValueAndValidity();
    });
  }

  initValidateForm(academicRank?: IAcademicRank) {
    this.validateForm = this.fb.group({
      fullname: new FormControl(academicRank ? academicRank.fullname : null, [
        Validators.required,
        Validators.maxLength(32),
        Validators.minLength(6),
      ]),
      shortname: new FormControl(academicRank ? academicRank.shortname : null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10),
      ]),
      description: new FormControl(
        academicRank ? academicRank.description : null,
        [Validators.minLength(10), Validators.maxLength(64)]
      ),
    });
  }

  getErrorTooltips(
    formControl: 'fullname' | 'shortname' | 'description'
  ): string {
    if (this.validateForm.controls.hasOwnProperty(formControl)) {
      const control = this.validateForm.controls[formControl];
      switch (formControl) {
        case 'fullname': {
          if (control.hasError('required')) {
            return 'Vui lòng nhập tên học hàm học vị (tên đầy đủ)';
          } else if (control.hasError('minlength')) {
            return 'Tên học hàm học vị quá ngắn';
          } else if (control.hasError('maxlength')) {
            return 'Tên học hàm học vị quá dài';
          }
          break;
        }
        case 'shortname': {
          if (control.hasError('required')) {
            return 'Vui lòng nhập mã học hàm học vị';
          } else if (control.hasError('minlength')) {
            return 'Mã học hàm học vị quá ngắn';
          } else if (control.hasError('maxlength')) {
            return 'Mã học hàm học vị quá dài';
          }
          break;
        }
        case 'description': {
          if (control.hasError('minlength')) {
            return 'Mô tả quá ngắn';
          } else if (control.hasError('maxlength')) {
            return 'Mô tả quá dài';
          }
        }
      }
    }

    return '';
  }
}
