import axios from "axios"

const API = axios.create({
  baseURL: "http://127.0.0.1:9000/api/v1",
})

// Add Authorization Header Automatically
API.interceptors.request.use(config => {
  const token = localStorage.getItem("accessToken")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle Unauthorized Requests (Logout on Expiry)
API.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      alert("Session expired! Please log in again.")
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      window.location.href = "/login" // Redirect to login
    }
    return Promise.reject(error)
  }
)

export default API
