import { useRef, useState, useEffect } from "react";
import {
  select,
  line,
  curveCardinal,
  scaleLinear,
  axisBottom,
  axisRight,
  ticks,
} from "d3";

export const AxesScalesChart = () => {
  const [data, setData] = useState([0, 40, 20, 145, 159, 10]);

  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);

    // axisBottom's argument is a scale function that transforms an
    // input value into somethings

    // scaleLinear will linearly transform values
    // can be used to fit data to a specific size graph
    // scaleLinear takes in domain and range (min,max)
    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);
    // use 300 because that is the size of the svg - want to scale
    // the x-axis to have even spaces between values

    const marginTop = -5;

    // use range as [150,0] instead of [0,150] so the lower left
    // corner of the svg is set to 0
    const yScale = scaleLinear()
      .domain([0, 200])
      .range([150, 0 - marginTop]);

    // axisBottom() puts the ticks on the bottom (relative), not the
    //  whole x-axis on the bottom
    // ticks() sets the number of ticks
    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((i) => i + 1);
    svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);

    const yAxis = axisRight(yScale).ticks(5);
    svg.select(".y-axis").style("transform", "translateX(300px)").call(yAxis);

    const myLine = line()
      .x((_, index) => xScale(index))
      .y((value) => yScale(value))
      .curve(curveCardinal);

    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("d", myLine)
      .attr("class", "line")
      .attr("stroke", "blue")
      .attr("stroke-width", "3px")
      .attr("fill", "none");
  }, [data]);

  return (
    <div>
      <svg className="chart" ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <br />
      <button onClick={() => setData(data.map((data) => Math.random() * 200))}>
        Generate new data
      </button>
    </div>
  );
};
