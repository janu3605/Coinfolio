import React, { useState, useEffect, useRef } from 'react';

/**
 * A component that animates a number counting up from 0 to a target value.
 * @param {object} props - The component props.
 * @param {number} props.value - The final number to count up to.
 * @param {number} [props.duration=1500] - The duration of the animation in milliseconds.
 * @param {Function} [props.onStart] - Callback function when animation starts.
 * @param {Function} [props.onComplete] - Callback function when animation completes.
 */
const AnimatedNumber = ({ value, duration = 1500, onStart, onComplete }) => {
  const [count, setCount] = useState(0);
  const animationFrameRef = useRef(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const startValue = 0;
    const endValue = parseInt(value, 10) || 0;
    if (endValue === 0) return; // No animation needed for zero

    const startTime = performance.now();
    hasStarted.current = false;

    const animate = (currentTime) => {
      if (!hasStarted.current) {
        if (onStart) onStart();
        hasStarted.current = true;
      }

      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      const currentVal = Math.floor(progress * (endValue - startValue) + startValue);
      setCount(currentVal);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(endValue);
        if (onComplete) {
          onComplete();
        }
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // Ensure sound stops if component unmounts mid-animation
      if (hasStarted.current && onComplete) {
        onComplete();
      }
    };
  }, [value, duration, onStart, onComplete]);

  return <>{count}</>;
};

export default AnimatedNumber;

