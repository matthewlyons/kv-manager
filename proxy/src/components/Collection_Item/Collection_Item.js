import React from 'react';

export default function Collection_Item({ product }) {
  let { title, description, points, image, _id } = product;
  let { url } = image;
  return (
    <li
      className="CollectionProductSelector CollectionProductItem Padding30"
      data-price="213.99"
      data-title={title}
    >
      <a
        href={`/community/application/Teacher/Store/${_id}`}
        className="CollectionProductLink"
      >
        <h3 className="CollectionProductTitle">{title}</h3>
        <div className="CollectionGrid">
          <img
            src={`${url}?tr=w-200,h-200`}
            alt={title}
            className="CollectionProductImage"
          />
          <div>
            <p
              className="CollectionProductDescription desktop TextSize14"
              style={{ textAlign: 'left' }}
            >
              {description}
            </p>
            <button
              className="btn"
              style={{ padding: '5px 10px', marginTop: '5px' }}
            >
              MORE...
            </button>
          </div>
          <div>
            <h3 className="collectProductprice">{points} Points</h3>
          </div>
        </div>
      </a>
    </li>
  );
}
