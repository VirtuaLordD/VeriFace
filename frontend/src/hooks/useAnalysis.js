import { useState, useCallback } from 'react';

export const useAnalysis = (apiFunction) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const submitAnalysis = useCallback(async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiFunction(data);
      setResult(response.data);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.detail || err.message || 'An error occurred during analysis';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [apiFunction]);

  const clearResult = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    result,
    submitAnalysis,
    clearResult,
  };
};
