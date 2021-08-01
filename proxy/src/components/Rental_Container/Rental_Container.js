import React, { useState } from 'react';

export default function Rental_Container(props) {
  console.log('Hello World!');
  console.log(props);
  let { instrument, location } = props;
  let content;
  let delivery =
    location === 'Instrument' ? 'local pickup' : 'easy school delivery';

  if (instrument == 'Cello' || instrument == 'Bass') {
    content = `Kennedy Violins offers the nation’s most convenient and
    affordable ${instrument} rentals with fast, ${delivery}
    and outstanding customer service. With no contracts or hidden
    fees, enjoy our highest quality, teacher-approved student and
    advanced ${instrument} outfits. Exchange or return anytime. Get
    up to 24  months of rental payments as credit toward a ${instrument} purchase!`;
  } else {
    content = `Kennedy Violins offers the nation’s most convenient and
    affordable ${instrument} rentals with fast, ${delivery}
    and outstanding customer service. With no contracts or hidden
    fees, enjoy our highest quality, teacher-approved student and
    advanced ${instrument} outfits. Exchange or return anytime. Get
    up to 12  months of rental payments as credit toward a ${instrument} purchase!`;
  }
  return (
    <section className="InstrumentSelectPage">
      <div className="shopify-section">
        <section className="MeetTheStaff_Section TextCenter">
          <h2 className="PaddingTopBottom TextBold">{instrument} Rentals</h2>
          <div className="PaddingTopBottom">
            <div className="PaddingTopBottom">
              <p>{content}</p>
            </div>
            <div className="TextCenter PaddingTopBottom">
              <h2>Every {instrument} Outfit includes</h2>
              <h3>- Bow - Case - Rosin -</h3>
            </div>
          </div>
        </section>
      </div>
      {props.children}
    </section>
  );
}
