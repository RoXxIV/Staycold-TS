/**
 * @fileoverview BathDataService.ts holds the BathDataService class
 * which is used to make requests to the bath API.
 * @requires http-common
 */
import http from "../http-common";

const limit = 4;

class BathDataService {
  /**
   * @description get all baths
   * @returns {Promise} axios promise
   */
  getAll() {
    return http.get("/bath");
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
   * @returns {Promise} axios promise
   */
  create(data: object) {
    return http.post("/bath", data);
  }

  /**
   * @description update bath
   * @param {string} id - bath id
   * @param {object} data - bath data
   * @returns {Promise} axios promise
   */
  update(id: string, data: object) {
    return http.put(`/bath/${id}`, data);
  }

  /**
   * @description delete bath
   * @param {string} id - bath id
   * @returns {Promise} axios promise
   */
  delete(id: string) {
    return http.delete(`/bath/${id}`);
  }
}

export default new BathDataService();
