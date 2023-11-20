/**
 * @fileoverview http-common.ts holds the axios instance for the backend
 */
import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});
