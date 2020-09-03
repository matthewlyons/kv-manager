import React, { useState, useEffect, useMemo } from 'react';

import { makeRequest } from '../../util';

export default function Teacher_Signup() {
  const [success, setSuccess] = useState(false);
  const [responseErrors, setResponseErrors] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      title: e.target[0].value,
      firstName: e.target[1].value,
      lastName: e.target[2].value,
      email: e.target[3].value
    };
    console.log(data);
    makeRequest('post', '/teachers', data)
      .then((response) => {
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setResponseErrors(err.errors);
      });
  };

  return (
    <React.Fragment>
      {success ? (
        <h1>Success</h1>
      ) : (
        <section>
          <h2 className="TextCenter">Join now!</h2>
          <div className="FormWarning">
            {responseErrors.map((error, i) => {
              return <h3 key={i}>{error.message}</h3>;
            })}
          </div>

          <form
            onSubmit={onSubmit}
            className="TextCenter StandardForm"
            style={{ display: 'grid', gridRowGap: '1em' }}
          >
            <div className="Grid Gap Third">
              <div>
                <label htmlFor="title">Title</label>
                <select className="input" id="title" name="title">
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                  <option value="Dr">Dr</option>
                  <option value="Prof">Prof</option>
                  <option value="N/A">N/A</option>
                </select>
              </div>
              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className={'input'}
                  id="firstName"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className={'input'}
                  id="lastName"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email">Your Email</label>
              <input
                type="text"
                name="email"
                className={'input'}
                id="email"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" id="Submit">
              Submit
            </button>
          </form>
        </section>
      )}
    </React.Fragment>
  );
}
