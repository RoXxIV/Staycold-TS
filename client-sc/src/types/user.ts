/**
 * @fileoverview Type definitions for User.
 */

export interface IUserRole {
  _id: string;
  name: string;
}

export interface IUserProfile {
  _id: string;
  username: string;
  email: string;
  password: string;
  status: "Pending" | "Active";
  roles: IUserRole[];
  bathCount: number;
  createdAt: string;
  updatedAt: string;
}
