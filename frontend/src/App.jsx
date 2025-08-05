import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import PostJob from './pages/PostJob';
import Applications from './pages/Applications';
import Profile from './pages/Profile';
import CompanyDashboard from './pages/CompanyDashboard';
import CreateJob from './pages/CreateJob';
import CompanyJobs from './pages/CompanyJobs';
import EditJob from './pages/EditJob';

import './index.css';

// صفحة 404
const NotFound = () => (
  <div className="flex items-center justify-center min-h-screen bg-base-100 text-center">
    <h1 className="text-4xl font-bold text-error">404 - Page Not Found</h1>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-base-100 text-base-content transition-all duration-300">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />

            <Route
              path="/post-job"
              element={
                <ProtectedRoute requiredRole="company">
                  <PostJob />
                </ProtectedRoute>
              }
            />

            <Route
              path="/applications"
              element={
                <ProtectedRoute>
                  <Applications />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/company"
              element={
                <ProtectedRoute requiredRole="company">
                  <CompanyDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/company/jobs"
              element={
                <ProtectedRoute requiredRole="company">
                  <CompanyJobs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/company/jobs/create"
              element={
                <ProtectedRoute requiredRole="company">
                  <CreateJob />
                </ProtectedRoute>
              }
            />
            <Route
              path="/company/jobs/edit/:id"
              element={
                <ProtectedRoute requiredRole="company">
                  <EditJob />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
