import React, { useEffect, useState } from 'react';

const circleConfig = {
  viewBox: '0 0 38 38',
  x: '19',
  y: '19',
  radio: '15.91549430918954'
};

export default function Circle_Animation(props) {
  let { className, children } = props;

  const [progress, setProgress] = useState(0);

  const updatePercentage = () => {
    setTimeout(() => {
      setProgress(progress + 1);
    }, 5);
  };

  useEffect(() => {
    if (100 > 0) updatePercentage();
  }, []);

  useEffect(() => {
    if (progress < 100) updatePercentage();
  }, [progress]);

  return (
    <figure className={className}>
      <svg viewBox={circleConfig.viewBox}>
        <circle
          className="path"
          cx={circleConfig.x}
          cy={circleConfig.y}
          r={circleConfig.radio}
          strokeDasharray={`${progress} ${100 - progress}`}
          strokeDashoffset={25}
          fill="transparent"
          stroke="#5b8499"
        />
        {children}
      </svg>
    </figure>
  );
}
