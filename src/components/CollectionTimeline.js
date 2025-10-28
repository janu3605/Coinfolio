import React, { useMemo } from 'react';
import './CollectionTimeline.css';
// Assuming you have this component as it was in your original code.
// If not, you can replace the <AnimatedNumber ... /> line with:
// {totalCoins}
import AnimatedNumber from './AnimatedNumber'; 

// Original waypoints
const waypoints = [
  [0, 100],   // Start at bottom-left
  [25, 100],  // Flat section (early days)
  [35, 70],   // Spike 1 (7th Grade)
  [55, 70],   // Flat section (between 7th and 8th)
  [65, 30],   // Spike 2 (8th Grade)
  [85, 30],   // Flat section (high school / early college)
  [95, 5],    // Spike 3 (B.Tech)
  [100, 0]    // End at top-right
];

/**
 * Injects jitter into the flat sections of a path.
 * Ensures the path only ever goes up (y decreases) or stays flat.
 * @param {Array<Array<number>>} data - The original waypoints.
 * @param {number} jitterAmount - Max vertical (upward) jitter.
 * @param {number} pointsPerSegment - How many jitter points to add per flat segment.
 * @returns {Array<Array<number>>} - The new array of points with jitter.
 */
const addJitterToPath = (data, jitterAmount = 1.0, pointsPerSegment = 8) => {
  const newPath = [];
  let lastY = 100; // Start at max Y

  for (let i = 0; i < data.length - 1; i++) {
    const p1 = data[i];
    const p2 = data[i + 1];
    
    // Always add the starting waypoint of the segment
    newPath.push(p1);
    
    // Ensure lastY is set to the start of this segment
    // This allows for the big drops from the spikes
    lastY = p1[1]; 

    const isFlat = p1[1] === p2[1];

    if (isFlat) {
      // This is a flat segment, add jitter
      const deltaX = p2[0] - p1[0];
      const segmentBaselineY = p1[1]; // The "floor" for this segment

      for (let j = 1; j <= pointsPerSegment; j++) {
        const t = j / (pointsPerSegment + 1); // Distribute points evenly
        const x = p1[0] + deltaX * t;
        
        // Jitter "up" or "down" relative to the *last* point
        // (Math.random() - 0.5) gives a value between -0.5 and +0.5
        let yJitter = (Math.random() - 0.5) * jitterAmount;
        let y = lastY + yJitter;
        
        // Add a very slight upward drift to bias the growth
        y -= 0.02; 

        // --- CONSTRAINTS ---
        // 1. CRITICAL: Never go *down* (increase y) past the segment's baseline.
        // This ensures the collection never "shrinks".
        y = Math.min(y, segmentBaselineY);
        
        // 2. Clamp to top of chart (y=0)
        y = Math.max(0, y); 
        
        // 3. Optional: Add a "ceiling" to prevent it from jittering too high
        // e.g., max 5 units above the baseline
        y = Math.max(y, segmentBaselineY - 5); 

        newPath.push([x, y]);
        lastY = y; // Update lastY for the next jitter point
      }
    } 
    // For spike segments (where isFlat is false), we do nothing.
    // The next loop iteration will add p2 (as p1), creating the straight line.
  }
  
  // Add the very last point from the original waypoints
  newPath.push(data[data.length - 1]);
  
  // De-duplicate points just in case (e.g., [[25, 100], [25, 100]])
  const finalCleanPath = newPath.filter((point, i) => {
    if (i === 0) return true;
    return point[0] !== newPath[i-1][0] || point[1] !== newPath[i-1][1];
  });

  return finalCleanPath;
};


const CollectionTimeline = ({ totalCoins }) => {
  
  // Use useMemo to generate the random path only once on component mount
  const pathD = useMemo(() => {
    // Add jitter to the flat segments
    // (waypoints, jitterAmount, pointsPerSegment)
    const jitteryData = addJitterToPath(waypoints, 1.5, 10); 
    
    // Convert the point array to an SVG path string
    return jitteryData.map((point, i) => 
      `${i === 0 ? 'M' : 'L'} ${point[0].toFixed(2)} ${point[1].toFixed(2)}`
    ).join(' ');
  }, []); // Empty dependency array [] means this runs only once.

  return (
    <div className="timeline-chart-container">
      <h3 className="timeline-title">COLLECTION GROWTH (APPROX.)</h3>
      <div className="chart-wrapper">
        <svg
          className="timeline-chart-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* The X and Y axis lines */}
          <path className="timeline-chart-axes" d="M 0 0 L 0 100 L 100 100" />
          {/* The static, predictable collection line */}
          <path className="timeline-chart-line" d={pathD} />
        </svg>
        {/* Y-Axis Labels */}
        <div className="chart-label y-top">
          {totalCoins !== undefined && <AnimatedNumber value={totalCoins} duration={1500} />}
        </div>
        <div className="chart-label y-bottom">0</div>
        
        {/* X-Axis Labels positioned at the spikes */}
        <div className="chart-label x-axis" style={{ left: '30%' }}>7th Grade</div>
        <div className="chart-label x-axis" style={{ left: '60%' }}>8th Grade</div>
        <div className="chart-label x-axis" style={{ left: '90%' }}>B.Tech</div>
      </div>
    </div>
  );
};

export default CollectionTimeline;

