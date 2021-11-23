import { IProvince } from "./province.model";

export interface IDistrict{
  id: string,
  name: string
  province: IProvince
}
