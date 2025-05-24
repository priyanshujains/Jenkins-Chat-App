import axios from "axios";
export const baseURL = "http://backend:8080";
export const httpClient = axios.create({
  baseURL: baseURL,
});
