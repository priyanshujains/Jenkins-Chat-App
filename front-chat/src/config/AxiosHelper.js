import axios from "axios";
export const baseURL =  `http://${window.location.hostname}:8080`;
export const httpClient = axios.create({
  baseURL: baseURL,
});
