import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    // Simulate data compilation up to 100%
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Increment progress incrementally to feel real
        const diff = Math.floor(Math.random() * 15) + 5;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Watch progress state—the second it finishes, route to your final output view
  useEffect(() => {
    if (progress === 100) {
      console.log("AI Generation Complete. Fetching layout engine results...");
      // navigate("/results"); // Change this to your final generation results route later
    }
  }, [progress, navigate]);

  return (
    <div>
      <h1 className="text-7xl md:text-8xl font-black tracking-widest select-none animate-pulse">
        E-A.I
      </h1>
      <p className="text-gray-400 text-lg md:text-xl font-medium select-none tracking-wide">
        {progress < 40
          ? "Initializing engine..."
          : progress < 80
            ? "Processing context parameters..."
            : "Finalizing output structure..."}
      </p>
      <div className="w-full max-w-xl flex items-center gap-6">
        {/* Outer Pill Shape Track Border */}
        <div className="flex-1 border-2 border-white rounded-md p-1 h-10 flex items-center overflow-hidden">
          {/* Inner Filled Core Segment Tracking Progress State Dynamically */}
          <div
            style={{ width: `${progress}%` }}
            className="bg-white h-full rounded-sm transition-all duration-300 ease-out"
          />
        </div>

        {/* Text percentage alignment box */}
        <span className="text-xl md:text-2xl font-black min-w-[3.5rem] text-left tabular-nums tracking-wider">
          {progress}%
        </span>
      </div>
    </div>
  );
}
