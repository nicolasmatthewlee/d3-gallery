import {
  select,
  scaleLinear,
  scaleBand,
  axisBottom,
  axisRight,
} from "d3";
import { useState, useRef, useEffect } from "react";

export const AnimatedBarChart = () => {
  const svgRef = useRef();
  const [data, setData] = useState([10, 35, 50, 65, 80, 95]);

  useEffect(() => {
    const svg = select(svgRef.current);

    // scale data - use scaleBand
    // to map data to bands with a band width
    const xScale = scaleBand()
      .domain(data.map((v, i) => i)) // must explicity define values (not just min,max)
      .range([0, 300])
      .padding(0.5); // adds padding and automatically adjusts axis

    const yScale = scaleLinear().domain([0, 100]).range([150, 0]);

    // create axes
    const xAxis = axisBottom(xScale).ticks(data.length);
    svg
      .select(".x-axis")
      .style("transform", "translateY(150px)")
      .call(xAxis);

    const yAxis = axisRight(yScale).ticks(5);
    svg
      .select(".y-axis")
      .style("transform", "translateX(300px)")
      .call(yAxis);

    // create color scale for bars
    const colorScale = scaleLinear()
      .domain([20, 50, 100])
      .range(["red", "orange", "green"])
      .clamp(true);

    // draw bars
    // join() will add a rectangle for each data value
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("value", (v) => v)
      .style("transform", "scale(1,-1)") // switches orientation of y-axis
      .attr("x", (v, i) => xScale(i))
      .attr("width", xScale.bandwidth())
      .attr("y", -150)
      .transition()
      .attr("fill", (v) => colorScale(v))
      .attr("height", (v) => 150 - yScale(v)); // the property to be transitioned must come after transition()
  }, [data]);

  return (
    <div>
      <svg className="chart" ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <br />
      <button
        onClick={() => setData(data.map((n) => Math.random() * 100))}
      >
        Generate new data
      </button>
    </div>
  );
};
