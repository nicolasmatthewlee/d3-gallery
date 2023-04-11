import { useRef, useState, useEffect, RefObject } from "react";
import {
  select,
  scaleBand,
  scaleLinear,
  axisBottom,
  axisRight,
} from "d3";

import ResizeObserver from "resize-observer-polyfill";
import Button from "./button";

// custom React hook
// receives a reference and returns a width and height
const useResizeObserver = (ref: RefObject<Element>) => {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      // set resized dimensions
      setDimensions(entries[0].contentRect);
    });
    if (observeTarget) resizeObserver.observe(observeTarget);

    // cleanup
    return () => {
      if (observeTarget) resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
};

export const ResponsiveBarChart = () => {
  const [data, setData] = useState([10, 20, 30, 40, 50]);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // use custom react hook to get dimensions of svg
  // after each render
  // (css width set to 100%)
  const dimensions = useResizeObserver(svgContainerRef);

  useEffect(() => {
    // for initial load where there are no dimensions:
    if (!dimensions) return;

    const svg = select(svgRef.current);

    // create x-scale
    const xScale = scaleBand()
      .domain(data.map((_, i) => i))
      .range([0, dimensions.width])
      .padding(0.5);

    // create y-scale
    const yScale = scaleLinear()
      .domain([0, 100])
      .range([0, dimensions.height]);
    // create y-axis-scale
    const yAxisScale = scaleLinear()
      .domain([0, 100])
      .range([dimensions.height, 0]);

    // create x-axis
    const xAxis = axisBottom(xScale).tickFormat((i: number) => i + 1);
    svg
      .select(".x-axis")
      .style("transform", `translateY(${dimensions.height}px)`)
      .call(xAxis);

    // create y-axis
    const yAxis = axisRight(yAxisScale);
    svg
      .select(".y-axis")
      .style("transform", `translateX(${dimensions.width}px)`)
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
      .attr("y", -dimensions.height)
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
  }, [data, dimensions]);

  return (
    <div>
      <h3>Responsive Bar Chart</h3>
      <div ref={svgContainerRef} className="pr-[30px] pb-[30px]">
        <svg className="overflow-visible w-full" ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>

      <div className="space-x-[10px]">
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
