import React, { useRef, useState, useEffect } from "react";

const OceanLabel = ({ x, y, name, zoom, translate }) => {
  const textRef = useRef(null);
  const [textWidth, setTextWidth] = useState(0);
  const [textHeight, setTextHeight] = useState(0);

  useEffect(() => {
    if (textRef.current) {
      const { width, height } = textRef.current.getBBox();
      setTextWidth(width);
      setTextHeight(height);
    }
  }, [textRef, name]);

  const padding = 4;
  const rectX = x - padding / 2;
  const rectY = y - textHeight - padding / 2;
  const rectWidth = textWidth + padding * 2;
  const rectHeight = textHeight + padding * 2;

  return (
    <>
      <rect
        x={rectX}
        y={rectY}
        width={rectWidth}
        height={rectHeight}
        fill="#000"
        opacity="0.5"
        rx="2"
        ry="2"
        transform={`translate(${-translate[0]}, ${-translate[1]}) scale(${
          1 / zoom
        })`} // Apply inverse transform
      />
      <text
        ref={textRef}
        x={x}
        y={y}
        fontFamily="Century Gothic, sans-serif"
        fontSize="10"
        fill="#ffffff"
        transform={`translate(${-translate[0]}, ${-translate[1]}) scale(${
          1 / zoom
        })`} // Apply inverse transform
      >
        {name}
      </text>
    </>
  );
};

export default OceanLabel;
