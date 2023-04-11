import { useRef, useEffect, useState } from "react";
import { axisBottom, scaleBand, scaleLinear, select } from "d3";
import Button from "./button";

interface DataObject {
  color: string;
  value: number;
}

export const RacingBarChart = () => {
  const [data, setData] = useState<DataObject[]>([
    { color: "red", value: 1 },
    { color: "blue", value: 2 },
    { color: "green", value: 3 },
    { color: "orange", value: 4 },
    { color: "purple", value: 5 },
  ]);

  const [play, setPlay] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);

  // update data with setInterval
  useEffect(() => {
    const interval = setInterval(() => {
      if (play) {
        setData((data) =>
          data.map((obj) => ({
            color: obj.color,
            value: (obj.value += Math.floor(Math.random() * 5 + 1)),
          }))
        );
      }
    }, 500);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    const svg = select(svgRef.current);

    // sort the data
    data.sort((a, b) => b.value - a.value);

    // create x-scale, y-scale
    const yScale = scaleBand()
      .domain(data.map((n, i) => i))
      .range([0, 150])
      .padding(0.3);

    const xScale = scaleLinear()
      .domain([0, Math.max(...data.map((obj) => obj.value))])
      .range([0, 300]);

    // below: data() 2nd argument sets how to connect data to elements
    // match data not by index(default, but by unique color)
    // to get transition to apply to y

    // below: join() add attributes for y and width to append so
    // the transition doesn't run when the page is first loaded

    // draw bars
    svg
      .selectAll(".bar")
      .data(data, (obj: DataObject, i: number) => obj.color)
      .join((enter: any) =>
        enter
          .append("rect")
          .attr("y", (n: DataObject, i: number) => yScale(i))
          .attr("width", (n: DataObject) => xScale(n.value))
      )
      .attr("class", "bar")
      .attr("x", 0)
      .style("fill", (n: DataObject) => n.color)
      .attr("height", yScale.bandwidth())
      .transition()
      .attr("y", (n: DataObject, i: number) => yScale(i))
      .attr("width", (n: DataObject) => xScale(n.value));

    // draw labels
    svg
      .selectAll(".label")
      .data(data, (obj: DataObject, i: number) => obj.color)
      .join((enter: any) =>
        enter
          .append("text")
          .attr(
            "y",
            (n: DataObject, i: number) =>
              yScale(i) + yScale.bandwidth() - 4
          )
      )
      .text((obj: DataObject) => obj.value)
      .attr("class", "label")
      .attr("x", "4px")
      .style("fill", "white")
      .attr("font-family", "system-ui")
      .transition()
      .attr(
        "y",
        (n: DataObject, i: number) =>
          yScale(i) + yScale.bandwidth() - 4
      );

    // draw x-axis
    const xAxis = axisBottom(xScale);
    svg
      .select(".x-axis")
      .style("transform", `translateY(150px)`)
      .transition()
      .call(xAxis);
  }, [data]);

  return (
    <div>
      <h3>Racing Bar Chart</h3>
      <svg ref={svgRef} className="overflow-visible pb-[30px]">
        <g className="x-axis"></g>
      </svg>

      <Button
        text={play ? "Pause" : "Play"}
        onClick={() => {
          setPlay(!play);
        }}
      />
    </div>
  );
};