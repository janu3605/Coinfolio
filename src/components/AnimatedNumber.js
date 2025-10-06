import React, { useState, useEffect, useRef } from 'react';

/**
 * A component that animates a number counting up from 0 to a target value.
 * @param {object} props - The component props.
 * @param {number} props.value - The final number to count up to.
 * @param {number} [props.duration=1500] - The duration of the animation in milliseconds.
 */

const AnimatedNumber = ({ value, duration = 1500 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const start = 0;
    // Ensure value is a valid number, default to 0
    const end = parseInt(value, 10) || 0;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Calculate the current value based on the progress
      const currentVal = Math.floor(progress * (end - start) + start);
      setCount(currentVal);

      // Continue the animation until it's done
      if (progress < 1) {
        countRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end); // Ensure it ends on the exact value
      }
    };

    // Start the animation
    countRef.current = requestAnimationFrame(animate);

    // Cleanup function to cancel the animation frame
    return () => {
      if (countRef.current) {
        cancelAnimationFrame(countRef.current);
      }
    };
  }, [value, duration]);

  // Render just the number, so it can be styled by its parent
  return <>{count}</>;
};

export default AnimatedNumber;
