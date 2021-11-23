import { ICountry } from './../../models/country.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-hospital-form',
  templateUrl: './hospital-form.component.html',
  styleUrls: ['./hospital-form.component.scss'],
})
export class HospitalFormComponent implements OnInit {
  constructor() {}
  validateForm!: FormGroup;

  listCountry!: ICountry[];
  listCountryLoading = false;
  listContrySelected!: ICountry;

  ngOnInit(): void {}

  submitForm(): void {}
}
