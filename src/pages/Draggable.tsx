// @ts-nocheck
import React, { useState } from 'react';
import Box from '../components/Card';
import * as d3 from 'd3';

const BoxContainer = () => {
  const [boxes, setBoxes] = useState([
    { id: 1, x: 50, y: 50, isStatic: true },
    { id: 2, x: 300, y: 50 },
    { id: 3, x: 300, y: 300 },
    { id: 4, x: 50, y: 300 },
    { id: 5, x: 50, y: 550 },
  ]);

  const handleDrag = (index, x, y) => {
    setBoxes((prevBoxes) => {
      const updatedBoxes = [...prevBoxes];
      updatedBoxes[index] = { ...updatedBoxes[index], x, y };
      return updatedBoxes;
    });
    updateThreads();
  };

  const updateThreads = () => {
    d3.selectAll('.thread').each(function (d, i) {
      const startX = boxes[i].x + 100;
      const startY = boxes[i].y + 100;
      const endX = boxes[i + 1].x + 100;
      const endY = boxes[i + 1].y + 100;

      d3.select(this).attr('x1', startX).attr('y1', startY).attr('x2', endX).attr('y2', endY);
    });
  };

  return (
    <div style={{ position: 'relative' }}>
      {boxes.map((box, index) => (
        <Box key={box.id} x={box.x} y={box.y} />
      ))}
      {boxes.slice(0, 4).map((box, index) => (
        <line
          key={index}
          className="thread"
          x1={box.x + 100}
          y1={box.y + 100}
          x2={boxes[index + 1].x + 100}
          y2={boxes[index + 1].y + 100}
          style={{ stroke: 'black', strokeWidth: '1px' }}
        />
      ))}
      {boxes.slice(1).map((box, index) => (
        <Box key={box.id} x={box.x} y={box.y} />
      ))}
      {boxes.slice(1).map((box, index) => (
        <line
          key={index}
          className="thread"
          x1={boxes[index].x + 100}
          y1={boxes[index].y + 100}
          x2={box.x + 100}
          y2={box.y + 100}
          style={{ stroke: 'black', strokeWidth: '1px' }}
        />
      ))}
      <rect
        x={boxes[0].x}
        y={boxes[0].y}
        width="200"
        height="200"
        style={{ fill: 'transparent', cursor: 'default' }}
      />
      <circle cx={boxes[0].x + 100} cy={boxes[0].y + 100} r="5" fill="red" />
      <circle cx={boxes[4].x + 100} cy={boxes[4].y + 100} r="5" fill="red" />
    </div>
  );
};

export default BoxContainer;
