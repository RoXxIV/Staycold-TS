/**
 * @fileoverview Type definitions for User.
 */
export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  status: "Pending" | "Active";
  confirmationCode?: string;
  roles: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
