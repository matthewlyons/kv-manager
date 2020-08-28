import React, { useEffect } from 'react';

export default function Select_School(props) {
  let { updateData, schools } = props;

  useEffect(() => {
    console.log(schools);
  }, [schools]);

  const handleClick = (element) => {
    updateData('school', element);
  };

  return (
    <div>
      <h1>Select Your School</h1>
      <section className="Grid Fifth Gap PaddingTopBottom" id="SchoolList">
        {schools.map((element, i) => {
          return (
            <div
              className="SelectButton HoverPointer"
              key={i}
              onClick={() => {
                handleClick(element);
              }}
            >
              <img
                src={element.image}
                alt={element.name}
                className="FullWidth"
              />
              <h3 className="TextCenter">
                {element.name} {element.type}
              </h3>
            </div>
          );
        })}
      </section>
    </div>
  );
}
