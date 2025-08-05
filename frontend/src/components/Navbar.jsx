import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  BriefcaseIcon,
  UserIcon,
  PlusIcon,
  DocumentTextIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const renderLinks = () => {
    if (!user) {
      return (
        <>
          <Link to="/login" className="btn btn-ghost btn-sm text-sm">Login</Link>
          <Link to="/register" className="btn btn-primary btn-sm text-sm text-white">Register</Link>
        </>
      )
    }

    const commonLinks = [
      user.role === 'company' && (
        <Link to="/post-job" className="btn btn-primary btn-sm text-sm text-white flex items-center gap-1" key="post-job">
          <PlusIcon className="w-4 h-4" />
          Post Job
        </Link>
      ),
      <Link to="/applications" className="btn btn-ghost btn-sm text-sm flex items-center gap-1" key="applications">
        <DocumentTextIcon className="w-4 h-4" />
        Applications
      </Link>,
      <Link to="/profile" className="btn btn-ghost btn-sm text-sm flex items-center gap-1" key="profile">
        <UserIcon className="w-4 h-4" />
        Profile
      </Link>,
      user.role === 'admin' && (
        <Link to="/admin" className="btn btn-warning btn-sm text-sm flex items-center gap-1" key="admin">
          <WrenchScrewdriverIcon className="w-4 h-4" />
          Admin Panel
        </Link>
      ),
      <button onClick={handleLogout} className="btn btn-ghost btn-sm text-red-500 text-sm flex items-center gap-1" key="logout">
        <ArrowRightOnRectangleIcon className="w-4 h-4" />
        Logout
      </button>
    ]

    return commonLinks.filter(Boolean) // remove false values
  }

  return (
    <nav className="bg-base-100 border-b border-base-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold">
              <BriefcaseIcon className="w-6 h-6 text-primary" />
              JobPortal
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/jobs" className="btn btn-ghost btn-sm text-sm">Browse Jobs</Link>
            {renderLinks()}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="btn btn-ghost btn-sm"
            >
              {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-base-100 border-t border-base-200 px-4 py-3 space-y-2">
          <Link to="/jobs" className="block text-sm font-medium">Browse Jobs</Link>
          {user ? (
            <>
              {user.role === 'company' && (
                <Link to="/post-job" className="block text-sm font-medium">Post Job</Link>
              )}
              <Link to="/applications" className="block text-sm font-medium">Applications</Link>
              <Link to="/profile" className="block text-sm font-medium">Profile</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="block text-sm font-medium">Admin Panel</Link>
              )}
              <button
                onClick={handleLogout}
                className="block text-sm font-medium text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-sm font-medium">Login</Link>
              <Link to="/register" className="block text-sm font-medium text-primary">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
