/**
 * @fileoverview
 */

import http from "../http-common";
import authHeader from "./auth.header";

class UserService {
  /**
   * @description get all users
   * @param {number} page - page number
   * @param {number} limit - limit per page
   * @returns {Promise} axios promise
   */
  getAll(page: number, limit: number) {
    return http.get(`/users/all?page=${page}&limit=${limit}`, {
      headers: authHeader(),
    });
  }

  /**
   * @description delete user by id
   * @param id - user id
   * @returns - axios promise
   */
  delete(id: string) {
    return http.delete(`/users/${id}`, { headers: authHeader() });
  }
  /*
  get(id: string) {
    return http.get(`/users/${id}`);
  }

  create(data: any) {
    return http.post("/users", data);
  }

  update(id: string, data: any) {
    return http.put(`/users/${id}`, data);
  }

  

  deleteAll() {
    return http.delete(`/users`);
  }

  findByTitle(title: string) {
    return http.get(`/users?title=${title}`);
  }
  */
}

export default new UserService();
