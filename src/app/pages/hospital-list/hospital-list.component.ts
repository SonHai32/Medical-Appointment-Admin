import { NzMessageService } from 'ng-zorro-antd/message';
import { IHospital } from './../../models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.scss'],
})
export class HospitalListComponent implements OnInit {
  listHospital: IHospital[] = [];
  listHospitalLoading = false;

  checked = false;
  indeterminated = false;

  setOfCheckedItem = new Set<string>();

  constructor(
    private hospitalService: HospitalService,
    private nzMessageService: NzMessageService,
    private nzModalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.getListHospital();
  }

  getListHospital(): void {
    this.listHospitalLoading = true;
    this.hospitalService.getAll().subscribe(
      (res: IHospital[]) => {
        this.listHospital = res;
      },
      (err) => {
        console.log(err);
      },
      () => (this.listHospitalLoading = false)
    );
  }

  onAllItemCheck(checked: boolean): void {
    this.listHospital.forEach(({ id }) => {
      if (id) {
        this.updateCheckedSet(id, checked);
      }
    });

    this.refreshCheckedStatus();
  }

  onItemChecked(id: string | undefined, checked: boolean): void {
    if (id) {
      this.updateCheckedSet(id, checked);
      this.refreshCheckedStatus();
    }
  }

  updateCheckedSet(id: string, checked: boolean) {
    if (checked) {
      this.setOfCheckedItem.add(id);
    } else {
      this.setOfCheckedItem.delete(id);
    }
  }

  refreshCheckedStatus(): void {
    this.checked = this.listHospital.every(({ id }) => {
      return id && this.setOfCheckedItem.has(id);
    });

    this.indeterminated =
      this.listHospital.some(({ id }) => {
        return id && this.setOfCheckedItem.has(id);
      }) && !this.checked;
  }

  deleteConfirmBox(id?: string): void {
    this.nzModalService.confirm({
      nzTitle: 'Xóa bệnh viện',
      nzContent: `Bạn có muốn xóa ${
        id ? '' : this.setOfCheckedItem.size
      } bệnh viện`,
      nzOnOk: () =>
        this.deleteHospital(id)
          .then((res) => {
            this.deleteSuccess(id);
            this.nzMessageService.success('Xóa thành công');
          })
          .catch((err) => console.log(err)),
    });
  }

  deleteSuccess(hospitalId?: string): void {
    if (hospitalId) {
      this.listHospital = this.listHospital.filter(
        ({ id }) => id !== hospitalId
      );
      this.setOfCheckedItem.delete(hospitalId);
    } else {
      this.listHospital = this.listHospital.filter(({ id }) => {
        return id && !this.setOfCheckedItem.has(id);
      });
      this.setOfCheckedItem.clear();
    }
    this.refreshCheckedStatus();
  }

  deleteHospital(id?: string) {
    let listID: string[] = [];
    if (id) {
      listID = [id];
    } else {
      listID = this.listHospital
        .filter(({ id }) => {
          return id && this.setOfCheckedItem.has(id);
        })
        .map(({ id }) => {
          return id ? id : '';
        });
    }

    return this.hospitalService.delete(listID).toPromise();
  }
}
