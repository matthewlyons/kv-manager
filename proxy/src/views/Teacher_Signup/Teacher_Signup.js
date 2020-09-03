import React, { useState, useEffect, useMemo } from 'react';

import { useForm } from 'react-hook-form';

import * as yup from 'yup';

import { makeRequest } from '../../util';

let emailSchema = yup.string().email();

export default function Teacher_Signup() {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  });

  const [success, setSuccess] = useState(false);
  const [responseErrors, setResponseErrors] = useState([]);

  const onSubmit = (data) => {
    console.log(data);
    makeRequest('post', '/teachers', data)
      .then((response) => {
        setSuccess(true);
      })
      .catch((err) => {
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
            onSubmit={handleSubmit(onSubmit)}
            className="TextCenter StandardForm"
            style={{ display: 'grid', gridRowGap: '1em' }}
          >
            <div className="Grid Gap Third">
              <div>
                <label htmlFor="title">Title</label>
                <select
                  className="input"
                  id="title"
                  name="title"
                  ref={register}
                >
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
                  className={errors.firstName ? 'input warning' : 'input'}
                  id="firstName"
                  ref={register({ required: 'First Name is required' })}
                />
                <label className="WarningLabel" htmlFor="firstName">
                  {errors.firstName?.message}
                </label>
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className={errors.lastName ? 'input warning' : 'input'}
                  id="lastName"
                  ref={register({ required: 'Last Name is required' })}
                />
                <label className="WarningLabel" htmlFor="lastName">
                  {errors.lastName?.message}
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="email">Your Email</label>
              <input
                type="text"
                name="email"
                className={errors.email ? 'input warning' : 'input'}
                id="email"
                ref={register({
                  required: 'Email is required',
                  validate: {
                    isEmail: (value) => emailSchema.isValidSync(value)
                  }
                })}
              />
              <label className="WarningLabel" htmlFor="email">
                {errors.email?.type === 'isEmail'
                  ? 'Invalid Email'
                  : errors.email?.message}
              </label>
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
