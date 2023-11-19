/**
 * @fileoverview http-common.ts holds the axios instance for the backend
 */
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-type": "application/json",
  },
});
