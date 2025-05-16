import { useState, useEffect } from "react";

// Custom hook for rate-limiting user actions (like login attempts)
const useRateLimiter = (limit = 3, timeout = 10000) => {
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    let timer;

    // Check if attempts exceed the limit -> Block user if limit is reached
    if (attempts >= limit) {
      setIsBlocked(true);

      // Set a timeout to reset attempts and unblock user after specified time
      timer = setTimeout(() => {
        setAttempts(0);
        setIsBlocked(false);
      }, timeout);
    }

    // Cleanup: Clear the timer on component unmount or attempts change
    return () => clearTimeout(timer);
  }, [attempts, limit, timeout]);

  // Function to increment the attempt count -> Only Increment if not blocked
  const incrementAttempts = () => {
    if (!isBlocked) setAttempts((prev) => prev + 1);
  };

  // Return the blocked status and function to increment attempts
  return { isBlocked, incrementAttempts };
};

export default useRateLimiter;
