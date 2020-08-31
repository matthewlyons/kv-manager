import React from 'react';

export default function Loading_Spinner(props) {
  let { title } = props;
  return (
    <section className="LoadingContainer">
      <h2>{title}</h2>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
}
