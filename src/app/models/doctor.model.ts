import { IWard } from './ward.model';
import { IHospital } from './hospital.model';
import { IAcademicRank } from './academic-rank.model';
import { IGender } from './gender.model';
import { ISpecialist } from './specialist.model';

export interface IDoctor {
  id?: string;
  firstname: string;
  middlename?: string;
  lastname: string;
  birthday: Date;
  emailAddress: string;
  phoneNumber: string;
  address: string;
  gender: IGender;
  citizenIdentification: string;
  startAt: Date;
  specialist: ISpecialist;
  academicRank: IAcademicRank[];
  hospital: IHospital;
  ward: IWard;
}
