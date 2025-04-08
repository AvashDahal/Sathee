// Add this utility function to your frontend
// (Create a new file like src/utils/apiUtils.js)

export const fetchWithTimeout = async (url, options = {}, timeout = 8000) => {
    // Create an abort controller for timeout handling
    const controller = new AbortController();
    const signal = controller.signal;
    
    // Set timeout to abort fetch if it takes too long
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      // Merge the signal with existing options
      const fetchOptions = {
        ...options,
        signal,
      };
      
      // Make the fetch request
      const response = await fetch(url, fetchOptions);
      
      // Clear the timeout since we got a response
      clearTimeout(timeoutId);
      
      return response;
    } catch (error) {
      // Clear timeout in case of error
      clearTimeout(timeoutId);
      
      // Add more context to the error
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Server might be down or unreachable.');
      }
      throw error;
    }
  };