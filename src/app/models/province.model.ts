import { ICountry } from "./country.model";

export interface IProvince{
  id: string,
  name: string,
  country: ICountry
}
