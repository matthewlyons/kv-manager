import React, { useMemo } from 'react';

export default function CustomizerProgress({ step, length }) {
  let percent = useMemo(() => {
    return `${((step + 1) / length) * 100}%`;
  }, [step, length]);
  return (
    <div className="ProgressBar__Container">
      <div className="ProgressBar__Inner" style={{ width: percent }}></div>
    </div>
  );
}
