import React, { useEffect, useRef, useState } from "react";
import { select } from "d3";

import "./styles/circle-chart.css";

export const CircleChart = () => {
  // sample data
  const [data, setData] = useState([5, 10, 15, 20, 25]);

  // useRef allows you to persist a mutable value that DOES NOT call
  // re-render when it is updated
  const svgRef = useRef();

  // useEffect lets you perform side effects in function components
  // similar to componentDidUpdate()
  // useEffect runs after the first render and after every update
  // can be thought of as "after render" - each effect "belongs"
  // to a particular render

  // useEffect runs after every render (produces a side effect)
  // React remembers the function you passed and will call it
  // after performing the DOM updates

  // useEffect(<function>,<dependency>)
  // first argument is function to be called
  // second argument is an array of dependencies that determine
  // if the effect will be run again (if dependencies are empty,
  // will only be run when the component is mounted and never
  // again)
  // if using dependencies, React will compare the current value of
  // the dependency to the value from the previous render; if it is
  // different, the effect is called
  // dependencies can be states or props
  useEffect(() => {
    // after render, use d3.select to
    const svg = select(svgRef.current);

    // tells d3 to select all circles in the svg and link them to
    // the data provided
    // then for each data, add circle with class new and radius r,
    // center (cx,cy) (from top left) based on the the value,
    // and if updated add class updated and if not needed, remove

    // .join() handles entering, updating, and exiting elements
    // do not need to declare exit callback because d3 default
    // will automatically remove elements
    svg
      .selectAll("circle")
      .data(data)
      .join((enter) => enter.append("circle"))
      .attr("stroke", "red")
      .attr("r", (value) => value)
      .attr("cx", (value) => value * 2)
      .attr("cy", (value) => value * 2);
  }, [data]);
  // ^^ above ^^ use data dependency to be called when data changes

  return (
    <div className="circle-chart">
      {/* the ref attribute allows the React element to be accessed
      through svgRef.current */}
      <svg ref={svgRef}></svg>
      <br />
      <button onClick={() => setData(data.map((n) => n + 5))}>
        Update data
      </button>
      <br />
      <button onClick={() => setData(data.filter((value) => value < 35))}>
        Filter data
      </button>
    </div>
  );
};
