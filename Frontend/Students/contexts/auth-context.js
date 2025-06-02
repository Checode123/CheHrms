"use client"

import { createContext, useContext, useReducer, useEffect } from "react"
import { authApi } from "@/lib/api"

const AuthContext = createContext()

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
}

function authReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        loading: false,
        error: null,
      }
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken")
        if (!token) {
          dispatch({ type: "SET_LOADING", payload: false })
          return
        }

        const user = await authApi.getCurrentUser()
        dispatch({ type: "SET_USER", payload: user })
      } catch (error) {
        localStorage.removeItem("authToken")
        dispatch({ type: "SET_ERROR", payload: error.message })
      }
    }

    checkAuth()
  }, [])

  const login = async (credentials) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      const response = await authApi.login(credentials)

      localStorage.setItem("authToken", response.token)
      dispatch({ type: "SET_USER", payload: response.user })

      return response
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message })
      throw error
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.removeItem("authToken")
      dispatch({ type: "LOGOUT" })
    }
  }

  const updateProfile = async (profileData) => {
    try {
      const updatedUser = await authApi.updateProfile(profileData)
      dispatch({ type: "SET_USER", payload: updatedUser })
      return updatedUser
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message })
      throw error
    }
  }

  const value = {
    ...state,
    login,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
