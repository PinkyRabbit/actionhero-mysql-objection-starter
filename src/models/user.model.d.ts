import { RolesEnum } from './../enums';

export interface IUser {
  id: number;
  email: string;
  password: string;
  role: RolesEnum;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}