import { useEffect, useState, useRef } from "react";
import { select, line, curveCardinal } from "d3";

export const LineChart = () => {
  const [data, setData] = useState([
    1, 35, 4, 60, 20, 1.5, 13, 75, 89, 32,
  ]);
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    const myLine = line()
      .x((value, index) => index * 30)
      .y((value) => 150 - value)
      .curve(curveCardinal);
    // 150 is the height, so subtract by 150
    // to have y-values start from lower left coordinate
    // curve(curveCardinal) smooths out the data

    // data() links each path element to a piece of data.
    // Must wrap data array in an array so it only makes 1 path
    // element

    // join() Appends, removes and reorders elements as necessary
    // to match the data that was previously bound by selection.data,
    // returning the merged, entered, and updated selection

    // attr() adds the attribute "d" and the value of the svg path
    // in an svg element, the d attribute defines a path to be drawn
    svg
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("d", (value) => myLine(value))
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);

  return (
    <div>
      <svg className="chart" ref={svgRef}></svg>
      <br />
      <button onClick={() => setData(data.map((v) => v + 0.2 * v))}>
        Update Data
      </button>
    </div>
  );
};
