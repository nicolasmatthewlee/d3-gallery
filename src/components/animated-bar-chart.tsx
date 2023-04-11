import {
  select,
  scaleLinear,
  scaleBand,
  axisBottom,
  axisRight,
} from "d3";
import { useState, useRef, useEffect } from "react";
import Button from "./button";

export const AnimatedBarChart = () => {
  const svgRef = useRef<SVGSVGElement>(null);
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
      .attr("value", (v: number) => v)
      .style("transform", "scale(1,-1)") // switches orientation of y-axis
      .attr("x", (v: number, i: number) => xScale(i))
      .attr("width", xScale.bandwidth())
      .attr("y", -150)
      .transition()
      .attr("fill", (v: number) => colorScale(v))
      .attr("height", (v: number) => 150 - yScale(v)); // the property to be transitioned must come after transition()
  }, [data]);

  return (
    <div>
      <h3>Animated Bar Chart</h3>
      <svg className="overflow-visible pb-[30px]" ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>

      <Button
        onClick={() => setData(data.map((n) => Math.random() * 100))}
        text="Generate new data"
      />
    </div>
  );
};
