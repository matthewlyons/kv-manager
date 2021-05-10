import React, { useMemo } from 'react';

import { motion, AnimateSharedLayout } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function CustomizerIcon({
  title,
  complete,
  last,
  isSelected,
  setStep,
  index
}) {
  const spring = {
    type: 'spring',
    stiffness: 500,
    damping: 30
  };

  let classList = useMemo(() => {
    if (complete) {
      return 'CustomizerIcon CustomizerIcon--Active';
    } else {
      return 'CustomizerIcon';
    }
  }, [complete]);
  return (
    <React.Fragment>
      {last ? (
        <div
          className="CustomizerContainer"
          onClick={() => {
            setStep(index);
          }}
        >
          <div className={classList}>
            <FontAwesomeIcon icon={complete ? faCheck : faPlus} />
            {isSelected && (
              <motion.div
                layoutId="outline"
                className="outline"
                initial={false}
                animate={{ borderColor: complete ? '#5b8499' : '#d3d3d3' }}
                transition={spring}
              />
            )}
          </div>
          <h4>{title}</h4>
        </div>
      ) : (
        <div
          className="CustomizerContainer"
          onClick={() => {
            setStep(index);
          }}
        >
          <div className="something">
            <div className={classList}>
              <FontAwesomeIcon icon={complete ? faCheck : faPlus} />
              {isSelected && (
                <motion.div
                  layoutId="outline"
                  className="outline"
                  initial={false}
                  animate={{ borderColor: complete ? '#5b8499' : '#d3d3d3' }}
                  transition={spring}
                />
              )}
            </div>
          </div>
          <h4>{title}</h4>
        </div>
      )}
    </React.Fragment>
  );
}
