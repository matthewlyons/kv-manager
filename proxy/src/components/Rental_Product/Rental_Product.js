import React from 'react';

export default function Rental_Product(props) {
  let {
    image,
    name,
    type,
    price,
    feature1,
    feature2,
    feature3,
    feature4,
    sizes
  } = props.product;
  let { link } = props;
  return (
    <section className="Grid Gap Third BottomLine PaddingTopBottom">
      <div>
        <img src={image} alt={`${name} ${type}`} className="FullWidth" />
      </div>
      <div>
        <h3 className="TextBold Red TextCenter">
          {name} : {type}
        </h3>
        <h3 className="TextBold TextCenter">${price} / Month</h3>
        <br />
        <ul>
          <li>{feature1}</li>
          <li>{feature2}</li>
          <li>{feature3}</li>
          <li>{feature4}</li>
        </ul>
        <br />
        <h3 className="TextBold">Available Sizes:</h3>
        <p>{sizes}</p>
      </div>
      <div className="Flex FlexCenter">
        <a href={link.url} className="PaddingTopBottom">
          <button className="btn">{link.label}</button>
        </a>
      </div>
    </section>
  );
}
