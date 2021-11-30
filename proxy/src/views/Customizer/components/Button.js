import React from 'react';

export default function Button({ text, onClick }) {
  return (
    <button className="Button" onClick={onClick}>
      {text}
    </button>
  );
}
