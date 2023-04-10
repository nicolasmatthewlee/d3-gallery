import { useEffect, useRef, useState } from "react";
import { select, scaleLinear } from "d3";
import { Button } from "./button";

export const ScatterPlot = () => {
  const generateData = (n) => {
    let data = [];
    for (let i = 0; i < n; i += 1) {
      data.push([
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
      ]);
    }
    return data;
  };
  const [data, setData] = useState(generateData(100));
  const [slider, setSlider] = useState(100);
  const svgRef = useRef();

  let height = 300;
  let width = 300;

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleLinear().domain([0, 100]).range([0, width]);
    const yScale = scaleLinear().domain([0, 100]).range([0, height]);

    svg
      .selectAll(".dot")
      .data(data)
      .join("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d[0]))
      .attr("cy", (d) => yScale(d[1]))
      .attr("r", 7)
      .style("fill", "rgb(255,0,0)")
      .style("stroke-width", "1px")
      .style("stroke", "white")
      .on("mouseenter", (event, value) => {
        event.target.style.fill = "black";
        // add text background
        svg
          .selectAll(".data-label-rect")
          .data(value)
          .join("rect")
          .attr("class", "data-label-rect")
          .text(value)
          .attr("x", xScale(value[0]) - 40)
          .attr("y", yScale(value[1]) - 35)
          .attr("width", "80")
          .attr("height", "25")
          .style("fill", "white")
          .style("stroke", "black")
          .style("stroke-width", "2px")
          .attr("rx", "1");
        // add text
        svg
          .selectAll(".data-label")
          .data(value)
          .join("text")
          .attr("class", "data-label")
          .text(value)
          .attr("x", xScale(value[0]))
          .attr("y", yScale(value[1]) - 15)
          .style("font-size", "20px")
          .style("font-weight", "800")
          .style("font-family", "monospace")
          .style("text-anchor", "middle");
      })
      .on("mouseleave", () => {
        svg.selectAll(".data-label").remove();
        svg.selectAll(".data-label-rect").remove();
        svg.selectAll(".dot").style("fill", "red");
      });
  }, [data]);

  return (
    <div>
      <svg
        height={height}
        width={width}
        ref={svgRef}
        style={{
          border: "3px solid whitesmoke",
          borderRadius: "5px",
        }}
      ></svg>
      <div
        style={{ display: "flex", paddingTop: "10px", gap: "10px" }}
      >
        <input
          type="range"
          min={1}
          max={300}
          defaultValue={100}
          onChange={(e) => setSlider(e.target.value)}
        ></input>
        <Button
          onClick={() => setData(generateData(slider))}
          text="generate data"
        />
      </div>
    </div>
  );
};
