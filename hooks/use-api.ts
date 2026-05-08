import { useState, useCallback, useEffect } from 'react';
import { api, ApiResponse } from '@/lib/api-client';

/**
 * Reusable hook for API calls with built-in loading and error states.
 */
export function useApi<T = any>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (
      requestPromise: Promise<ApiResponse<T>>,
      options: { onSuccess?: (data: T) => void; onError?: (error: string) => void } = {}
    ) => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await requestPromise;
        
        if (response.success && response.data !== undefined) {
          setData(response.data);
          options.onSuccess?.(response.data);
          return response.data;
        } else {
          const errorMsg = response.error || 'Failed to fetch data';
          setError(errorMsg);
          options.onError?.(errorMsg);
          return null;
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(errorMsg);
        options.onError?.(errorMsg);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    data,
    loading,
    error,
    execute,
    setData,
  };
}

/**
 * Hook specifically for fetching properties with auto-fetch on mount
 */
export function useProperties() {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<any[]>('/api/listings');
      
      if (response.success && response.data !== undefined) {
        setData(response.data);
      } else {
        setError(response.error || 'Failed to fetch properties');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-fetch on mount
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return {
    data,
    loading,
    error,
    refetch: fetchProperties,
  };
}

