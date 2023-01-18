import { useRef, useEffect, useState } from "react";
import { scaleBand, scaleLinear, select } from "d3";

export const RacingBarChart = () => {
  const [data, setData] = useState([
    { color: "red", value: 1 },
    { color: "blue", value: 2 },
    { color: "green", value: 3 },
    { color: "orange", value: 4 },
    { color: "purple", value: 5 },
  ]);

  const [play, setPlay] = useState(false);

  const svgRef = useRef();

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
    svg
      .selectAll(".bar")
      .data(data, (obj, i) => obj.color)
      .join((enter) =>
        enter
          .append("rect")
          .attr("y", (n, i) => yScale(i))
          .attr("width", (n) => xScale(n.value))
      )
      .attr("class", "bar")
      .attr("x", 0)
      .style("fill", (n) => n.color)
      .attr("height", yScale.bandwidth())
      .transition()
      .attr("y", (n, i) => yScale(i))
      .attr("width", (n) => xScale(n.value));
  }, [data]);

  return (
    <div>
      <h1>{data.map((n) => n.value + " ")}</h1>
      <svg ref={svgRef} className="chart"></svg>
      <button
        onClick={(e) => {
          setPlay(!play);
        }}
      >
        {play ? "Pause" : "Play"}
      </button>
    </div>
  );
};
