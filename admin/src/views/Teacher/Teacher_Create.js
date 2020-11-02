import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Select,
  Card,
  Form,
  FormLayout,
  TextField,
  Page,
  Button
} from '@shopify/polaris';

import { StoreContext } from '../../context/StoreContext';

import * as yup from 'yup';

import { makeRequest } from '../../util';

let emailSchema = yup.string().email();

export default function Teacher_Create() {
  let history = useHistory();

  const { state, setError } = useContext(StoreContext);

  const [teacher, setTeacher] = useState({
    title: 'Mr',
    firstName: '',
    lastName: '',
    email: '',
    code: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field) => {
    return (value) => {
      setTeacher({ ...teacher, [field]: value });
    };
  };

  const handleSubmit = () => {
    setErrors({});
    let errorOBJ = {};
    if (teacher.firstName === undefined || teacher.firstName === '') {
      errorOBJ.firstName = 'Required';
    }
    if (teacher.lastName === undefined || teacher.lastName === '') {
      errorOBJ.lastName = 'Required';
    }
    if (teacher.email === undefined || teacher.email === '') {
      errorOBJ.email = 'Required';
    } else if (!emailSchema.isValidSync(teacher.email)) {
      errorOBJ.email = 'Not Valid';
    }
    if (teacher.code === undefined || teacher.code === '') {
      errorOBJ.code = 'Required';
    }

    if (Object.keys(errorOBJ).length > 0) {
      setErrors(errorOBJ);
    } else {
      makeRequest('POST', '/teacher', { teacher })
        .then((data) => {
          history.push(`/Teacher/Teachers/View/${data._id}`);
        })
        .catch((err) => {
          setError(err);
        });
    }
  };

  const options = [
    { label: 'Mr', value: 'Mr' },
    { label: 'Ms', value: 'Ms' },
    { label: 'Mrs', value: 'Mrs' },
    { label: 'Dr', value: 'Dr' },
    { label: 'Prof', value: 'Prof' },
    { label: 'N/A', value: 'N/A' }
  ];

  return (
    <Page
      full-width
      separator
      title="Create Teacher"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/Teacher'
        }
      ]}
    >
      <Card sectioned>
        <Form onSubmit={handleSubmit}>
          <FormLayout.Group>
            <Select
              label="Title"
              options={options}
              value={teacher.title}
              onChange={handleInputChange('title')}
            />
            <TextField
              type="text"
              label="First Name"
              error={errors.firstName}
              value={teacher.firstName}
              onChange={handleInputChange('firstName')}
            />
            <TextField
              type="text"
              label="Last Name"
              error={errors.lastName}
              value={teacher.lastName}
              onChange={handleInputChange('lastName')}
            />
          </FormLayout.Group>

          <FormLayout.Group>
            <TextField
              type="text"
              label="Email"
              error={errors.email}
              value={teacher.email}
              onChange={handleInputChange('email')}
            />
          </FormLayout.Group>
          <FormLayout.Group>
            <TextField
              type="text"
              label="Teacher Code"
              error={errors.code}
              value={teacher.code}
              onChange={handleInputChange('code')}
            />
          </FormLayout.Group>
          <FormLayout.Group>
            <Button submit>Submit</Button>
          </FormLayout.Group>
        </Form>
      </Card>
    </Page>
  );
}
