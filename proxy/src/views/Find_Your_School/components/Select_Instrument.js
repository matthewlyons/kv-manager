import React, { useMemo, useEffect } from 'react';
import Back from './Back';

export default function Select_Instrument(props) {
  let { updateData, data, goBack } = props;
  let { teacher, className, book } = data.class;

  let teacherName = useMemo(() => {
    return teacher.title == 'N/A'
      ? teacher.firstName + teacher.lastName
      : teacher.title + '.' + teacher.lastName;
  }, []);

  const handleClick = (element) => {
    updateData('instrument', element);
  };

  return (
    <div>
      <Back goBack={goBack} />
      <section className="PaddingTopBottom TextCenter">
        <h2 className="PaddingTopBottom Red TextBold">
          Welcome to {teacherName}'s {className} Class
        </h2>
        <h3 className="PaddingTopBottom">
          You will recieve a FREE Shoulder Rest, Tuner and {book}
        </h3>
      </section>

      <section className="InstrumentSelectPage PaddingTopBottom">
        <h2 className="PaddingTopBottom TextCenter">Select Your Instrument</h2>
        <div className="Grid Gap Fourth">
          <div
            className="InstrumentSelectItem SelectButton HoverPointer"
            onClick={() => {
              handleClick('Violin');
            }}
          >
            <img
              src="https://cdn.shopify.com/s/files/1/2994/5334/files/nav-instruments-violin.png?7826848096287280869"
              className="InstrumentSelectImage"
            />
            <h3>Violin</h3>
          </div>
          <div
            className="InstrumentSelectItem SelectButton HoverPointer"
            onClick={() => {
              handleClick('Viola');
            }}
          >
            <img
              src="https://cdn.shopify.com/s/files/1/2994/5334/files/nav-instruments-viola.png?7826848096287280869"
              className="InstrumentSelectImage"
            />
            <h3>Viola</h3>
          </div>
          <div
            className="InstrumentSelectItem SelectButton HoverPointer"
            onClick={() => {
              handleClick('Cello');
            }}
          >
            <img
              src="https://cdn.shopify.com/s/files/1/2994/5334/files/nav-instruments-Cello.png?7826848096287280869"
              className="InstrumentSelectImage"
            />
            <h3>Cello</h3>
          </div>
          <div
            className="InstrumentSelectItem SelectButton HoverPointer"
            onClick={() => {
              handleClick('Bass');
            }}
          >
            <img
              src="https://cdn.shopify.com/s/files/1/2994/5334/files/nav-instruments-Bass.png?7826848096287280869"
              className="InstrumentSelectImage"
            />
            <h3>Bass</h3>
          </div>
        </div>
      </section>
    </div>
  );
}
