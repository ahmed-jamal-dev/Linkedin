import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth()

  // لودينج سبينر أثناء تحميل بيانات المستخدم
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  // لو مفيش يوزر متسجل هدخله عالـ Login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // لو فيه دور محدد مطلوب، وهو مش نفس دور المستخدم → رجّعه للهوم
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />
  }

  // لو كل حاجة تمام → اعرض الصفحة
  return children
}

export default ProtectedRoute
