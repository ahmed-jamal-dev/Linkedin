import React from 'react'
import { Link } from 'react-router-dom'
import { 
  BriefcaseIcon, 
  UserGroupIcon, 
  BuildingOfficeIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-28">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Find Your Dream Job
            </h1>
            <p className="text-2xl md:text-3xl mb-10 text-blue-200 font-light">
              Connect with top companies and discover opportunities that match your skills
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/jobs"
                className="bg-white text-blue-700 px-10 py-4 rounded-xl font-semibold shadow-md hover:shadow-lg hover:bg-gray-100 transition duration-300 flex items-center justify-center"
              >
                Browse Jobs
                <ArrowRightIcon className="ml-3 h-6 w-6" />
              </Link>
              <Link
                to="/register"
                className="border-2 border-white text-white px-10 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition duration-300 flex items-center justify-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
              Why Choose JobPortal?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We make job searching and hiring simple and effective
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-10 rounded-2xl border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
                <BriefcaseIcon className="h-10 w-10 text-blue-700" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-5">
                Quality Jobs
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Access to thousands of verified job opportunities from top companies across various industries.
              </p>
            </div>

            <div className="text-center p-10 rounded-2xl border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
                <UserGroupIcon className="h-10 w-10 text-green-700" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-5">
                Easy Application
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Apply to multiple jobs with just a few clicks. Upload your CV once and use it for all applications.
              </p>
            </div>

            <div className="text-center p-10 rounded-2xl border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
                <BuildingOfficeIcon className="h-10 w-10 text-purple-700" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-5">
                For Companies
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Post jobs, manage applications, and find the perfect candidates for your organization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">



        </div>
      </section>
    </div>
  )
}

export default Home
