import { ISpecialist } from 'src/app/models/specialist.model';
import { IHospital } from './hospital.model';

export interface IHospitalService {
  id?: string;
  name: string;
  price: string;
  hospital: IHospital;
  specialist: ISpecialist;
}
