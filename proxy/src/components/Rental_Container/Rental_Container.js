import React from 'react';

export default function Rental_Container(props) {
  let { instrument } = props;
  return (
    <section className="InstrumentSelectPage">
      <div className="shopify-section">
        <section className="MeetTheStaff_Section TextCenter">
          <h2 className="PaddingTopBottom TextBold">{instrument} Rentals</h2>
          <div className="PaddingTopBottom">
            <div className="PaddingTopBottom">
              <p>
                Kennedy Violins offers the nation’s most convenient and
                affordable {instrument} rentals with fast, easy home delivery
                and outstanding customer service. With no contracts or hidden
                fees, enjoy our highest quality, teacher-approved student and
                advanced {instrument} outfits. Exchange or return anytime. Get
                up to 12 months of rental payments as credit toward a{' '}
                {instrument} purchase!
              </p>
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
