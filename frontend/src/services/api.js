import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {} // ✅ اتركه فاضي ليتعامل تلقائيًا مع JSON أو FormData
})

// Add token to all requests automatically if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ====== Auth API ======
export const authAPI = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  register: (userData) =>
    api.post('/auth/register', userData),

  getProfile: () =>
    api.get('/auth/profile')
}

// ====== Jobs API ======
export const jobsAPI = {
  getAllJobs: (params = {}) =>
    api.get('/jobs', { params }),

  getJobById: (id) =>
    api.get(`/jobs/${id}`),

  createJob: (jobData) =>
    api.post('/jobs', jobData),

  updateJob: (id, jobData) =>
    api.put(`/jobs/${id}`, jobData),

  deleteJob: (id) =>
    api.delete(`/jobs/${id}`)
}

// ====== Applications API ======
export const applicationsAPI = {
  applyToJob: (jobId, formData) => {
    // ❗ Don't manually set Content-Type for FormData
    return api.post(`/applications/${jobId}`, formData)
  },

  getMyApplications: () =>
    api.get('/applications'),

  getApplicationsForJob: (jobId) =>
    api.get(`/applications/job/${jobId}`),

  downloadCV: (filename) =>
    api.get(`/applications/download/${filename}`, {
      responseType: 'blob'
    })
}

export default api
