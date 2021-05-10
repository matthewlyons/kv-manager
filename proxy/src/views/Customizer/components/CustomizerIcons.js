import React, { useMemo, useEffect } from 'react';
import CustomizerIcon from './CustomizerIcon';
import { motion, AnimateSharedLayout } from 'framer-motion';

export default function CustomizerIcons({ step, setStep, groups }) {
  let columns = useMemo(() => {
    let arr = new Array(groups.length);
    arr.fill('1fr');
    let str = arr.join(' ');
    return str;
  }, [groups]);
  return (
    <AnimateSharedLayout>
      <div className="CustomizerIcons" style={{ gridTemplateColumns: columns }}>
        {groups.map((element, i) => {
          return (
            <CustomizerIcon
              key={i}
              title={element.title}
              complete={element.complete}
              last={i == groups.length - 1}
              isSelected={i == step}
              step={step}
              setStep={setStep}
              index={i}
            />
          );
        })}
      </div>
    </AnimateSharedLayout>
  );
}
