import React, { useEffect, useState } from 'react';

export default function Select_Rental(props) {
  let { products, data } = props;
  const [rentalProducts, setRentalProducts] = useState([]);

  useEffect(() => {
    const filteredProducts = products
      .filter((instrument) => instrument.type === data.instrument)
      .sort((a, b) => (a.price > b.price ? 1 : -1));
    setRentalProducts(filteredProducts);
  }, [products]);

  return (
    <section className="InstrumentSelectPage">
      <h2>Select Your {data.instrument}</h2>
      {data.instrument && (
        <div>
          {rentalProducts.map((element, i) => {
            return (
              <section
                key={i}
                className="Grid Gap Third BottomLine PaddingTopBottom"
              >
                <div>
                  <img src={element.image} alt="" className="FullWidth" />
                </div>
                <div>
                  <h3 className="TextBold Red TextCenter">
                    {element.name} : {element.type}
                  </h3>
                  <h3 className="TextBold TextCenter">
                    ${element.price} / Month
                  </h3>
                  <br />
                  <ul>
                    <li>{element.feature1}</li>
                    <li>{element.feature2}</li>
                    <li>{element.feature3}</li>
                    <li>{element.feature4}</li>
                  </ul>
                  <br />
                  <h3 className="TextBold">Available Sizes:</h3>
                  <p>{element.sizes}</p>
                </div>
                <div className="TextCenter Grid RowGap">
                  <a
                    href={`${element.linkEducation}/?school=${data.school.name}&class=${data.class.className}&teachercode=${data.class.teacher.code}`}
                    className="PaddingTopBottom"
                  >
                    <button className="btn">Rent</button>
                  </a>
                </div>
              </section>
            );
          })}
        </div>
      )}
    </section>
  );
}
