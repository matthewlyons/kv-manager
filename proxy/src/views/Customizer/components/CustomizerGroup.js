import React, { useState, useEffect } from 'react';

import GroupProduct from './GroupProduct';

export default function CustomizerGroup({ tabs, active, onChange }) {
  const [activeAccordian, setActiveAccordian] = useState(0);

  useEffect(() => {
    setActiveAccordian(0);
  }, [active]);

  return (
    <div className="CustomizerGroup">
      <div className="Tab__Headers">
        {tabs.map((x, i) => {
          let headerClass = 'Tab__Header';
          if (i == active) {
            headerClass = headerClass + ' Tab__Header--Active';
          }
          return (
            <div
              key={i}
              className={headerClass}
              onClick={() => {
                onChange(i);
              }}
            >
              <h3>{x.name}:</h3>
            </div>
          );
        })}
      </div>
      <div className="Tab__Sections">
        {tabs.map((x, tab) => {
          return (
            <React.Fragment key={tab}>
              {x.sections.map((section, index) => {
                let sectionHeaderClass = 'Tab__SectionHeader';
                let sectionContainerClass = 'Tab__SectionContainer';
                if (index == activeAccordian) {
                  sectionHeaderClass =
                    sectionHeaderClass + ' Tab__SectionHeader--Active';
                  sectionContainerClass =
                    sectionContainerClass + ' Tab__SectionContainer--Active';
                }
                return (
                  <div key={index}>
                    <div
                      className={sectionHeaderClass}
                      onClick={(e) => {
                        setActiveAccordian(index);
                      }}
                    >
                      <h3> {index == activeAccordian ? ' - ' : ' + '} </h3>
                      <h3>{section.name}</h3>
                    </div>
                    <div className={sectionContainerClass}>
                      {section.products.map((product, productIndex) => {
                        return (
                          <GroupProduct product={product} key={productIndex} />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
