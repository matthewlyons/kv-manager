import React from 'react';

export default function SelectedProductDisplay({ image, title, subheading }) {
  return (
    <div>
      <img src={image} className="DisplayImage" />
      <p style={{ fontSize: '12px', lineHeight: '12px' }}>{title}</p>
      <p style={{ fontSize: '12px', lineHeight: '12px' }}>{subheading}</p>
    </div>
  );
}
