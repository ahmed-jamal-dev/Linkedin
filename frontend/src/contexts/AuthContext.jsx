import React, { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'

// إنشاء السياق
const AuthContext = createContext()

// Hook مخصص لاستخدام السياق
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('❌ useAuth must be used within an AuthProvider')
  }
  return context
}

// مزود السياق
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // جلب الملف الشخصي عند تحميل التطبيق
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      authAPI.getProfile()
        .then(res => {
          setUser(res.data.user)
          console.log('✅ user profile:', res.data.user)
        })
        .catch(() => {
          localStorage.removeItem('token')
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  // تسجيل الدخول
  const login = async (email, password) => {
    try {
      const res = await authAPI.login(email, password)
      const { token } = res.data
      localStorage.setItem('token', token)

      const profile = await authAPI.getProfile()
      setUser(profile.data.user)

      return {
        success: true,
        data: {
          token,
          user: profile.data.user,
        },
      }
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Login failed',
      }
    }
  }

  // تسجيل حساب جديد
  const register = async (userData) => {
    try {
      await authAPI.register(userData)
      return { success: true }
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Registration failed',
      }
    }
  }

  // تسجيل الخروج
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  // القيمة التي سيتم مشاركتها عبر التطبيق
  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading,
  }

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}
