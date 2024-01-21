// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import "./App.css";
import Card from "./components/Card";
import { GoogleSVG } from "./data/Google";
import {
  checkIndex,
  checkIndexForChildren,
  checkIndexForTitle,
} from "./helper/conditionalHelper";

const ConnectorComponent = () => {
  const [movableDivPositions, setMovableDivPositions] = useState([
    { x: 20, y: 550 },
    { x: 250, y: 550 },
    { x: 560, y: 550 },
    { x: 860, y: 550 },
    {
      x: 1160,
      y: 550,
    },
  ]);

  const immovableDivPosition = { x: 250, y: 100 };

  const movableDivRefs = useRef(
    Array(movableDivPositions.length)
      .fill(null)
      .map(() => React.createRef())
  );

  useEffect(() => {
    const svg = d3.select(".connector-container");

    const drag = (index) =>
      d3
        .drag<SVGCircleElement, { x: number; y: number }>()
        .on("start", () => {
          movableDivRefs.current.forEach((ref, i) => {
            if (i === index) ref.current.style.cursor = "grabbing";
            else ref.current.style.pointerEvents = "none";
          });
        })
        .on("drag", (event) => {
          const updatedPositions = [...movableDivPositions];
          updatedPositions[index] = { x: event.x, y: event.y };
          setMovableDivPositions(updatedPositions);
        })
        .on("end", () => {
          movableDivRefs.current.forEach((ref) => {
            ref.current.style.cursor = "grab";
            ref.current.style.pointerEvents = "auto";
          });
        });

    movableDivRefs.current.forEach((ref, index) => {
      d3.select(ref.current).call(drag(index));
    });

    svg.selectAll(".connector-line").remove();

    movableDivPositions.forEach((position, index) => {
      svg
        .append("line")
        .attr("class", "connector-line")
        .attr("x1", immovableDivPosition.x + 5)
        .attr("y1", immovableDivPosition.y + 100)
        .attr("x2", position.x + 145)
        .attr("y2", position.y + 2)
        .attr("stroke", "#d2ddfe")
        .attr("stroke-width", 1);
    });
  }, [immovableDivPosition, movableDivPositions]);

  // useEffect(() => {
  //   const innerContentDrag = (parentIndex) => {
  //     const dragBehavior = d3
  //       .drag<SVGCircleElement, { x: number; y: number }>()
  //       .on("start", () => {
  //         movableDivRefs.current[parentIndex].current.style.pointerEvents = "none";
  //       })
  //       .on("drag", (event) => {
  //         const updatedPositions = [...movableDivPositions];
  //         updatedPositions[parentIndex].children = updatedPositions[
  //           parentIndex
  //         ].children.map((child) => ({
  //           x: child.x + event.dx,
  //           y: child.y + event.dy,
  //         }));
  //         setMovableDivPositions(updatedPositions);

  //         d3.select(movableDivRefs.current[parentIndex].current)
  //           .selectAll(".draggable-circle")
  //           .attr("cx", (d) => d.x)
  //           .attr("cy", (d) => d.y);
  //       })
  //       .on("end", () => {
  //         movableDivRefs.current[parentIndex].current.style.pointerEvents = "auto";
  //       });

  //     return dragBehavior;
  //   };

  //   movableDivPositions.forEach((position, parentIndex) => {
  //     if (position.children && position.children.length > 0) {
  //       const circles = d3.select(movableDivRefs.current[parentIndex].current)
  //         .selectAll(".draggable-circle")
  //         .data(position.children);

  //       circles.enter()
  //         .append("circle")
  //         .attr("class", "draggable-circle")
  //         .attr("cx", (d) => d.x)
  //         .attr("cy", (d) => d.y)
  //         .attr("r", 15)
  //         .merge(circles)  // Merge enter and update selections
  //         .call(innerContentDrag(parentIndex));

  //       circles.exit().remove();  // Remove any circles not in the updated data
  //     }
  //   });
  // }, [movableDivPositions]);

  return (
    <svg className="connector-container">
      <foreignObject
        x={immovableDivPosition.x}
        y={immovableDivPosition.y}
        width={200}
        height={100}
      >
        <div className="immovable-div">
          <div className="inner_content h-[full] ">
            <Card svg={<GoogleSVG />} title="Google" />
          </div>
        </div>
      </foreignObject>

      {movableDivPositions?.map((elem, index) => (
        <g key={index}>
          <foreignObject x={elem.x} y={elem.y} width={200} height={100}>
            <div
              className="movable-div bg-[#e4e8f5] w-[200px] h-[150px]"
              ref={movableDivRefs.current[index]}
            >
              <div className="absolute top-0 left-0 flex justify-center items-center">
                <div className="w-[20px] h-[20px] rounded-tl-[6px] rounded-br-[4px] bg-[#90EE90]" />
                <span className="font-[600] text-sm ml-[3px] color-[#90EE90] mb-[4px]">
                  {checkIndexForTitle(index)}
                </span>
              </div>
              <div className="inner_content flex w-[full] h-[70%] justify-center items-center flex gap-[3px]">
                {checkIndexForChildren(index).map(
                  (item: string, index: number) => (
                    <div
                      key={index}
                      className="circle rounded-[50%] w-[30px] h-[30px] bg-white relative"
                    >
                      <span className="absolute bottom-[-14px] fs-3 font-[600] ml-[6px] color-[#90EE90]">
                        {item.slice(0, 3) + "..."}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </foreignObject>
        </g>
      ))}
    </svg>
  );
};

export default ConnectorComponent;
