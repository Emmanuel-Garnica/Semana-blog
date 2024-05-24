import axios from "axios";

export const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'app-id': import.meta.env.VITE_API_ID,
  },
  params: {
    limit: 10
  }
})