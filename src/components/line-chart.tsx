import { useEffect, useRef, useState } from "react";
import { useResizeObserver } from "../graph-utilities";
import * as d3 from "d3";

import DATASOURCE from "../data/line-chart-data.csv";

export const LineChart = () => {
  const [data, setData] = useState<any[] | null>(null);

  useEffect(() => {
    d3.csv(DATASOURCE).then((data: any) => {
      data = data.map((d: { date: string; price: string }) => ({
        date: Date.parse(d.date),
        price: +d.price,
      }));
      setData(data);
    });
  }, []);

  const svgRef = useRef<SVGSVGElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);

  const dimensions = useResizeObserver(svgContainerRef);

  useEffect(() => {
    if (!data) return;
    if (!dimensions) return;
    const svg = d3.select(svgRef.current);

    const minX = Math.min(
      ...data.map((d: { date: number }) => d.date)
    );
    const maxX = Math.max(
      ...data.map((d: { date: number }) => d.date)
    );

    const xScale = d3
      .scaleTime()
      .domain([minX, maxX])
      .range([0, dimensions.width]);

    const minY = Math.min(
      ...data.map((d: { price: number }) => d.price)
    );
    const maxY = Math.max(
      ...data.map((d: { price: number }) => d.price)
    );

    const yScale = d3
      .scaleLinear()
      .domain([minY, maxY])
      .range([dimensions.height, 0]);

    const xAxis = d3.axisBottom(xScale).ticks(5);
    svg
      .select(".x-axis")
      .style("transform", `translateY(${dimensions.height}px)`)
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    svg.select(".y-axis").call(yAxis);

    svg
      .selectAll(".area")
      .data([data])
      .join("path")
      .attr("class", "area")
      .attr(
        "d",
        d3
          .area()
          .x((d: { date: Date; price: number }) => xScale(d.date))
          .y0(dimensions.height)
          .y1((d: { date: Date; price: number }) => yScale(d.price))
      )
      .style("fill", "#0062ff")
      .style("fill-opacity", "50%");

    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr(
        "d",
        d3
          .line()
          .x((d: { date: Date; price: number }) => xScale(d.date))
          .y((d: { date: Date; price: number }) => yScale(d.price))
      )
      .attr("fill", "none")
      .attr("stroke", "#0062ff")
      .style("stroke-width", "2");

    svg
      .selectAll(".hover-rect")
      .data(data)
      .join("rect")
      .attr("class", "hover-rect")
      .attr("x", (d: { date: Date; price: number }) => xScale(d.date))
      .attr("y", (d: { date: Date; price: number }) =>
        yScale(d.price)
      )
      .attr(
        "height",
        (d: { date: Date; price: number }) =>
          dimensions.height - yScale(d.price)
      )
      .attr("width", 3)
      .attr("fill-opacity", "0%")
      .on(
        "mouseenter",
        (
          event: React.ChangeEvent<SVGSVGElement>,
          d: { date: Date; price: number }
        ) => {
          const target = d3.select(event.target);

          const labelGroup = svg
            .selectAll(".data-label")
            .data([d])
            .join("g")
            .attr("class", "data-label");

          const labelBackground = labelGroup
            .append("rect")
            .attr("fill", "white")
            .attr("stroke", "black");

          const labelText = labelGroup.append("text").text(d.price);
          const textDimensions = labelText.node().getBBox();

          const paddingX = 7;
          const paddingY = 2;

          labelBackground
            .attr("width", textDimensions.width + paddingX * 2)
            .attr("height", textDimensions.height + paddingY * 2)
            .attr("y", -textDimensions.height - paddingY + 3)
            .attr("x", -paddingX);

          labelGroup.style(
            "transform",
            `translate(${
              target.attr("x") - textDimensions.width / 2
            }px,${yScale(d.price) - 15}px)`
          );
        }
      )
      .on("mouseleave", () => {
        svg.selectAll(".data-label").remove();
      });
  }, [dimensions, data]);

  return (
    <div>
      <h3 className="mb-[10px]">Line Chart</h3>
      <div
        ref={svgContainerRef}
        className="pr-[30px] pb-[30px] pl-[21px]"
      >
        <svg className="overflow-visible w-full" ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </div>
  );
};
