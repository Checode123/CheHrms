"use client"

import { useState, useEffect, useCallback } from "react"
import { handleApiError } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

// Generic hook for API calls
export function useApi(apiFunction, dependencies = [], options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { toast } = useToast()

  const { immediate = true, onSuccess, onError, showErrorToast = true, showSuccessToast = false } = options

  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true)
        setError(null)

        const result = await apiFunction(...args)
        setData(result)

        if (onSuccess) {
          onSuccess(result)
        }

        if (showSuccessToast) {
          toast({
            title: "Success",
            description: "Operation completed successfully",
          })
        }

        return result
      } catch (err) {
        setError(err)

        if (onError) {
          onError(err)
        }

        if (showErrorToast) {
          handleApiError(err, toast)
        }

        throw err
      } finally {
        setLoading(false)
      }
    },
    [apiFunction, onSuccess, onError, showErrorToast, showSuccessToast, toast],
  )

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, dependencies)

  const refetch = useCallback(() => execute(), [execute])

  return {
    data,
    loading,
    error,
    execute,
    refetch,
  }
}

// Hook for paginated API calls
export function usePaginatedApi(apiFunction, initialParams = {}, options = {}) {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [params, setParams] = useState(initialParams)
  const { toast } = useToast()

  const { immediate = true, onSuccess, onError, showErrorToast = true } = options

  const fetchData = useCallback(
    async (newParams = {}) => {
      try {
        setLoading(true)
        setError(null)

        const mergedParams = { ...params, ...newParams }
        const result = await apiFunction(mergedParams)

        setData(result.data || result)
        setPagination(
          result.pagination || {
            page: 1,
            limit: 10,
            total: result.data?.length || 0,
            totalPages: 1,
          },
        )

        if (onSuccess) {
          onSuccess(result)
        }

        return result
      } catch (err) {
        setError(err)

        if (onError) {
          onError(err)
        }

        if (showErrorToast) {
          handleApiError(err, toast)
        }

        throw err
      } finally {
        setLoading(false)
      }
    },
    [apiFunction, params, onSuccess, onError, showErrorToast, toast],
  )

  useEffect(() => {
    if (immediate) {
      fetchData()
    }
  }, [])

  const updateParams = useCallback(
    (newParams) => {
      setParams((prev) => ({ ...prev, ...newParams }))
      fetchData(newParams)
    },
    [fetchData],
  )

  const nextPage = useCallback(() => {
    if (pagination.page < pagination.totalPages) {
      updateParams({ page: pagination.page + 1 })
    }
  }, [pagination.page, pagination.totalPages, updateParams])

  const prevPage = useCallback(() => {
    if (pagination.page > 1) {
      updateParams({ page: pagination.page - 1 })
    }
  }, [pagination.page, updateParams])

  const goToPage = useCallback(
    (page) => {
      updateParams({ page })
    },
    [updateParams],
  )

  const refetch = useCallback(() => fetchData(), [fetchData])

  return {
    data,
    pagination,
    loading,
    error,
    params,
    updateParams,
    nextPage,
    prevPage,
    goToPage,
    refetch,
  }
}

// Hook for mutations (create, update, delete)
export function useMutation(apiFunction, options = {}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { toast } = useToast()

  const {
    onSuccess,
    onError,
    showErrorToast = true,
    showSuccessToast = true,
    successMessage = "Operation completed successfully",
  } = options

  const mutate = useCallback(
    async (...args) => {
      try {
        setLoading(true)
        setError(null)

        const result = await apiFunction(...args)

        if (onSuccess) {
          onSuccess(result)
        }

        if (showSuccessToast) {
          toast({
            title: "Success",
            description: successMessage,
          })
        }

        return result
      } catch (err) {
        setError(err)

        if (onError) {
          onError(err)
        }

        if (showErrorToast) {
          handleApiError(err, toast)
        }

        throw err
      } finally {
        setLoading(false)
      }
    },
    [apiFunction, onSuccess, onError, showErrorToast, showSuccessToast, successMessage, toast],
  )

  return {
    mutate,
    loading,
    error,
  }
}
