import { IWard } from './ward.model';
export interface IHospital {
  id?: string;
  name: string;
  address: string;
  ward: IWard;
}
