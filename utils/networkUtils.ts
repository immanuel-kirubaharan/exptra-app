export const isNetworkError = (error: any): boolean => {
  if (!error) return false;
  
  const errorMessage = error.message?.toLowerCase() || '';
  const errorCode = error.code?.toLowerCase() || '';
  
  return (
    errorCode.includes('network') ||
    errorMessage.includes('network') ||
    errorMessage.includes('offline') ||
    errorMessage.includes('no internet') ||
    errorMessage.includes('connection') ||
    errorCode === 'auth/network-request-failed'
  );
};

export const getNetworkErrorMessage = (): string => {
  return 'No internet connection. Please check your network and try again.';
};

export const handleNetworkError = (error: any): string => {
  if (isNetworkError(error)) {
    return getNetworkErrorMessage();
  }
  return error.message || 'An error occurred. Please try again.';
};
