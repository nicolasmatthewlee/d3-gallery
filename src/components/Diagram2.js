import { useEffect, useRef, useState } from "react";
import { select } from "d3";

import "./styles/Diagram2.css";

export const Diagram2 = () => {
  // useRef accepts one argument as the initial value and returns
  // a reference; reference.current accesses the reference value and
  // reference.value=newValue will update the reference value to a
  // new value

  // the value of a reference stays the same between component
  // re-renderings and updating a reference doesn't trigger
  // component re-rendering

  // example : setting a reference for the number of times a button
  // is clicked, and increasing the count each time the button is
  // clicked without invoking a re-render
  // ^^ different from useState because useState triggers component
  // re-rendering, will updating a reference does NOT
  // also, the reference update is synchronous while the state update
  // is asynchronous, so after updating a reference you immediately
  // access the updated value

  // useRef can also be used to access DOM elements (like used here)
  // 1. define the reference to access the element
  // 2. assign the reference to the ref attribute of the element
  // 3. after mounting, elementRef.current points to the DOM element

  // Before mounting, the reference will evaluate to undefined.
  // With useEffect (which is called right after rendering), the
  // reference is guaranteed to point to the DOM element (given that
  // the element exists).
  const svgRef = useRef();

  const [data, setData] = useState([20, 40, 60, 80]);

  // useEffect(<callback>,<dependencies>)
  useEffect(() => {
    // use d3.select with react.useRef to access the svg DOM element
    const svg = select(svgRef.current);

    svg
      .selectAll("text")
      .data(data)
      .join((n) => n.append("text"))
      .attr("x", 100)
      .attr("y", (value) => value)
      .attr("stroke", "black")
      .text((value) => `(100, ${value})`)
      .style("opacity", 0);

    svg.selectAll("text").transition().duration(200).style("opacity", 1);
  }, [data]);

  return (
    <div className="diagram2">
      <svg ref={svgRef}></svg>
      <br />
      <button onClick={() => setData(data.map((n) => n + 1))}>
        Update data
      </button>
    </div>
  );
};
