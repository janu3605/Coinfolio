import React, { useState, useEffect, useRef } from 'react';

const AnimatedNumber = ({ value, duration = 1500, onStart, onComplete }) => {
  const [count, setCount] = useState(0);
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const endValue = parseInt(value, 10) || 0;
    
    // Reset for new animation
    startTimeRef.current = null;
    hasStartedRef.current = false;

    if (endValue === 0) {
      setCount(0);
      return;
    }

    const animate = (currentTime) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      // Trigger onStart only once
      if (!hasStartedRef.current) {
        if (onStart) onStart();
        hasStartedRef.current = true;
      }

      const elapsedTime = currentTime - startTimeRef.current;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing function for smoother animation (optional, but nice)
      const ease = 1 - Math.pow(1 - progress, 3); 
      
      const currentVal = Math.floor(progress * endValue);
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
      // Important: Stop sound if component unmounts before finishing
      if (hasStartedRef.current && onComplete) {
        onComplete(); 
      }
    };
  }, [value, duration, onStart, onComplete]);

  return <>{count}</>;
};

export default AnimatedNumber;