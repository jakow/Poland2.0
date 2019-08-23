import * as React from 'react';
import { css } from 'emotion';
import { colors } from '../../variables';

const setStroke = (color?: string) => css({
  stroke: color || `${colors.red}`,
});

interface ArcProps {
  max: number;
  value: number;
  stroke?: string;
}

const Arc: React.StatelessComponent<ArcProps> = ({ max, value, stroke }) => {
  const radius = 27;
  const strokeWidth = 2;
  const size = 2 * radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  if (max !== 0) {
    offset = (value / max - 1) * circumference;
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        <circle
          className={setStroke(stroke)}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeWidth={strokeWidth}
          stroke="black"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="none"
        />
      </g>
    </svg>
  );
};

export default Arc;
