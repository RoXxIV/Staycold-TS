/**
 * @fileoverview Type definitions for User.
 */
export interface IUserProfile {
  _id: string;
  username: string;
  email: string;
  password: string;
  status: "Pending" | "Active";
  roles: string[];
}
