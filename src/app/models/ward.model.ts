import { IDistrict } from './district.model';

export interface IWard {
  id: string;
  name: string;
  district: IDistrict;
}
