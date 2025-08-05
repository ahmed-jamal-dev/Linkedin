import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { jobsAPI } from '../services/api'
import {
  MapPinIcon,
  CurrencyDollarIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'

function debounce(func, wait) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

const Jobs = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    type: ''
  })

  const fetchJobs = useCallback(async (filters) => {
    try {
      setLoading(true)
      const response = await jobsAPI.getAllJobs(filters)
      setJobs(response.data)
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const debouncedFetchJobs = useCallback(debounce(fetchJobs, 500), [fetchJobs])

  useEffect(() => {
    debouncedFetchJobs(filters)
  }, [filters, debouncedFetchJobs])

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }

  const formatSalary = (salary) => {
    if (!salary) return 'Salary not specified'
    return `$${salary.toLocaleString()}`
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-gray-800 dark:text-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">📋 Job Listings</h1>
        <button
          onClick={() => fetchJobs(filters)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <ArrowPathIcon className="w-5 h-5 animate-spin-slow" />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">🔍 Title</label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="title"
                value={filters.title}
                onChange={handleFilterChange}
                placeholder="Search jobs..."
                className="pl-10 w-full px-3 py-2 rounded-md border dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">📍 Location</label>
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="e.g. Cairo"
              className="w-full px-3 py-2 rounded-md border dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">🕒 Type</label>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 rounded-md border dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">All</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setFilters({ title: '', location: '', type: '' })}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Job Cards */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          <p>No jobs found based on your filters.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    <Link to={`/jobs/${job._id}`} className="hover:underline">
                      {job.title}
                    </Link>
                  </h3>

                  <div className="flex flex-wrap text-sm text-gray-600 dark:text-gray-300 gap-4 mb-2">
                    {job.location && (
                      <span className="flex items-center gap-1">
                        <MapPinIcon className="h-5 w-5" />
                        {job.location}
                      </span>
                    )}
                    {job.salary && (
                      <span className="flex items-center gap-1">
                        <CurrencyDollarIcon className="h-5 w-5" />
                        {formatSalary(job.salary)}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <ClockIcon className="h-5 w-5" />
                      {formatDate(job.createdAt)}
                    </span>
                    {job.type && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {job.type}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-700 dark:text-gray-200 line-clamp-3 text-sm">
                    {job.description}
                  </p>
                </div>

                <Link
                  to={`/jobs/${job._id}`}
                  className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Jobs
