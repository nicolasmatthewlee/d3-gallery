import { useRef, useEffect, useState } from "react";

export const RacingBarChart = () => {
  const [data, setData] = useState(Array(5).fill(0));

  // update data with setInterval
  useEffect(() => {
    const interval = setInterval(() => {
      setData((data) =>
        data.map((n) => Math.floor(n + Math.random() * 3 + 1))
      );
    }, 500);
    return () => clearInterval(interval);
  });

  return (
    <div>
      <h1>{data.map((n) => n + " ")}</h1>
      <svg className="chart"></svg>
    </div>
  );
};
