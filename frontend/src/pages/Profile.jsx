import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import {
  UserIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  IdentificationIcon
} from '@heroicons/react/24/outline'

const Profile = () => {
  const { user } = useAuth()

  const getRoleDisplay = (role) => {
    switch (role) {
      case 'candidate':
        return 'Job Seeker'
      case 'company':
        return 'Company'
      case 'admin':
        return 'Administrator'
      default:
        return role
    }
  }

  const getRoleIcon = (role) => {
    const baseClass = 'w-10 h-10 p-2 rounded-full bg-white shadow-md'
    switch (role) {
      case 'candidate':
        return <UserIcon className={`${baseClass} text-blue-600`} />
      case 'company':
        return <BuildingOfficeIcon className={`${baseClass} text-green-600`} />
      case 'admin':
        return <IdentificationIcon className={`${baseClass} text-purple-600`} />
      default:
        return <UserIcon className={`${baseClass} text-gray-600`} />
    }
  }

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'candidate':
        return 'bg-blue-100 text-blue-800'
      case 'company':
        return 'bg-green-100 text-green-800'
      case 'admin':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-gray-900">
        <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden transition-all">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-10">
          <div className="flex items-center">
            <div className="mr-5">
              {getRoleIcon(user.role)}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white tracking-wide">
                {user.name || 'User Profile'}
              </h1>
              <p className="text-blue-100 mt-2 text-sm">
                Welcome to your profile dashboard
              </p>
            </div>
          </div>
        </div>

        <div className="px-8 py-10 space-y-10">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                Account Information
              </h2>

              <div className="space-y-5">
                <div className="flex items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <UserIcon className="h-6 w-6 text-gray-400 mr-4" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-300">Full Name</p>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">{user.name || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <EnvelopeIcon className="h-6 w-6 text-gray-400 mr-4" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-300">Email Address</p>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <IdentificationIcon className="h-6 w-6 text-gray-400 mr-4" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-300">Account Type</p>
                    <span className={`inline-block mt-1 px-3 py-1 text-sm font-medium rounded-full ${getRoleBadgeColor(user.role)}`}>
                      {getRoleDisplay(user.role)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                Quick Actions
              </h2>

              <div className="space-y-4">
                {user.role === 'candidate' && (
                  <>
                    <a
                      href="/jobs"
                      className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg shadow transition"
                    >
                      Browse Available Jobs
                    </a>
                    <a
                      href="/applications"
                      className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-700 text-center py-3 rounded-lg shadow transition"
                    >
                      View My Applications
                    </a>
                  </>
                )}

                {user.role === 'company' && (
                  <>
                    <a
                      href="/post-job"
                      className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-lg shadow transition"
                    >
                      Post New Job
                    </a>
                    <a
                      href="/applications"
                      className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-700 text-center py-3 rounded-lg shadow transition"
                    >
                      Manage Applications
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
