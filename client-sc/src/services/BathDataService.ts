/**
 * @fileoverview BathDataService.ts holds the BathDataService class
 * which is used to make requests to the bath API.
 * @requires http-common
 */
import http from "../http-common";
import authHeader from "./auth.header";

const limit = 4;

class BathDataService {
  /**
   * @description get all baths
   * @param {number} page - page number
   * @param {number} limit - limit per page
   * @returns {Promise} axios promise
   */
  getAll(page: number, limit: number) {
    return http.get(`/bath?page=${page}&limit=${limit}`);
  }

  /**
   * @description get bath by id
   * @param {string} id - bath id
   * @returns {Promise} axios promise
   */
  getOne(id: string) {
    return http.get(`/bath/${id}`);
  }

  /**
   * @description get bath by author
   * @param {string} userId - bath author
   * @returns {Promise} axios promise
   */
  getByAuthor(userId: string) {
    return http.get(`/bath/user/${userId}`);
  }

  /**
   * @description get recent baths with limit
   * @returns {Promise} axios promise
   */
  getRecent() {
    return http.get(`/bath/recent/${limit}`);
  }

  /**
   * @description create bath
   * @param {object} data - bath data
   * @param {object} headers - auth header
   * @returns {Promise} axios promise
   */
  create(data: object) {
    return http.post("/bath", data, { headers: authHeader() });
  }

  /**
   * @description update bath
   * @param {string} id - bath id
   * @param {object} data - bath data
   * @param {object} headers - auth header
   * @returns {Promise} axios promise
   */
  update(id: string, data: object) {
    return http.put(`/bath/${id}`, data, { headers: authHeader() });
  }

  /**
   * @description delete bath
   * @param {string} id - bath id
   * @param {object} headers - auth header
   * @returns {Promise} axios promise
   */
  delete(id: string, userId: string) {
    return http.delete(`/bath/${id}`, {
      data: { author: userId },
      headers: authHeader(),
    });
  }
}

export default new BathDataService();
