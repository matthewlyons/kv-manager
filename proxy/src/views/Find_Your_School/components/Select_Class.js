import React, { useState, useEffect } from 'react';
import Back from './Back';

export default function Select_Class(props) {
  let { updateData, data, goBack } = props;
  let { school } = data;

  const handleClick = (element) => {
    updateData('class', element);
  };

  return (
    <section>
      <Back goBack={goBack} />
      <section
        className="PaddingTopBottom Grid Gap SelectYourClass"
        style={{ gridTemplateColumns: '1fr 2fr' }}
      >
        <div>
          <img src={school.image} className="FullWidth" />
        </div>
        <div className="TextCenter">
          <h2>
            {school.name} {school.type}
          </h2>
          <h3>{school.street}</h3>
          <h3>
            {school.city}, {school.state} {school.zip}
          </h3>
          <div>
            <h2>Select Your Class</h2>
            <ul>
              {school.classList.map((element, i) => {
                return (
                  <li
                    className="HoverColorBlue HoverPointer SelectButton"
                    key={i}
                    onClick={() => {
                      handleClick(element);
                    }}
                  >
                    <h3>{element.className}</h3>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </section>
  );
}
