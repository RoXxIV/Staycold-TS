/**
 * @fileoverview Type definitions for the auth store.
 */
import type { IUser } from "./user";

export interface IAuthState {
  user: IUser | null;
  status: { loggedIn: boolean };
}

export interface IAuthStore {
  id: string;
  state: () => IAuthState;
  actions: {
    status: any;
    user: null;
    login: (userData: { username: string; password: string }) => Promise<void>;
    register: (userData: {
      username: string;
      email: string;
      password: string;
    }) => Promise<string>;
    logout: () => void;
  };
}
