import { useRef, useState, useEffect } from "react";
import {
  select,
  scaleBand,
  scaleLinear,
  axisBottom,
  axisRight,
} from "d3";

import Button from "./button";

export const InteractiveBarChart = () => {
  const [data, setData] = useState([10, 20, 30, 40, 50]);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = select(svgRef.current);

    // create x-scale
    const xScale = scaleBand()
      .domain(data.map((_, i) => i))
      .range([0, 300])
      .padding(0.5);

    // create y-scale
    const yScale = scaleLinear().domain([0, 100]).range([0, 150]);
    // create y-axis-scale
    const yAxisScale = scaleLinear().domain([0, 100]).range([150, 0]);

    // create x-axis
    const xAxis = axisBottom(xScale).tickFormat((i: number) => i + 1);
    svg
      .select(".x-axis")
      .style("transform", "translateY(150px)")
      .call(xAxis);

    // create y-axis
    const yAxis = axisRight(yAxisScale);
    svg
      .select(".y-axis")
      .style("transform", "translateX(300px)")
      .call(yAxis);

    // create bars
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .style("transform", "scale(1,-1)")
      .attr("class", "bar")
      .attr("width", xScale.bandwidth())
      .attr("x", (_: number, i: number) => xScale(i))
      .attr("y", -150)
      // on() must be set before transition
      .on(
        "mouseenter",
        (event: React.ChangeEvent<SVGSVGElement>, value: number) => {
          svg
            .selectAll(".data-label")
            .data([value])
            .join("text")
            .attr("class", "data-label")
            .text(value)
            .attr(
              "x",
              event.target.x.baseVal.value + xScale.bandwidth() / 2
            )
            .attr("text-anchor", "middle")
            .attr("y", yAxisScale(value) - 5)
            .transition()
            .attr("opacity", 1);
        }
      )
      .on("mouseleave", () => svg.select(".data-label").remove())
      .transition()
      .attr("height", yScale);
  }, [data]);

  return (
    <div>
      <h3>Interactive Bar Chart</h3>
      <svg ref={svgRef} className="overflow-visible pb-[30px]">
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <div className="flex space-x-[10px]">
        <Button
          text="Generate new data"
          onClick={() =>
            setData(data.map(() => Math.floor(Math.random() * 100)))
          }
        />
        <Button
          text="Add data"
          onClick={() =>
            setData(data.concat(Math.floor(Math.random() * 100)))
          }
        />
      </div>
    </div>
  );
};
