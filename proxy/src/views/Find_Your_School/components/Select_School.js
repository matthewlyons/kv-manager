import React, { useEffect, useState } from 'react';
import Loading_Spinner from '../../../components/Loading_Spinner';

export default function Select_School(props) {
  let { updateData, schools, loading } = props;

  const [query, setQuery] = useState('');

  useEffect(() => {
    console.log(schools);
  }, [schools]);

  const handleClick = (element) => {
    updateData('school', element);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <div
        id="shopify-section-App-Rental-FindYourSchool-Header"
        className="shopify-section"
      >
        <section className="PaddingTopBottom20 TextCenter">
          <img
            src="//cdn.shopify.com/s/files/1/2994/5334/files/loacal-rental-header3_x960.jpg?v=1558547770"
            alt="About US"
            className="FullWidth"
          />
        </section>

        <section className="PaddingTopBottom20">
          <div className="JoelsCornerSearch">
            <input
              type="text"
              placeholder="Find Your School"
              onChange={handleInputChange}
            />
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </section>
      </div>

      <section className="PaddingTopBottom"></section>
      {loading ? (
        <Loading_Spinner title="Loading Schools" />
      ) : (
        <section className="Grid Fifth Gap PaddingTopBottom" id="SchoolList">
          {schools.map((element, i) => {
            if (
              query === '' ||
              element.name.toLowerCase().includes(query.toLowerCase()) ||
              element.type.toLowerCase().includes(query.toLowerCase())
            ) {
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
            }
          })}
        </section>
      )}
    </div>
  );
}
