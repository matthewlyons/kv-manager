import React, { useState, useMemo } from 'react';

import { useHistory } from 'react-router-dom';

import {
  Select,
  Card,
  Form,
  FormLayout,
  TextField,
  Page,
  Layout,
  Button
} from '@shopify/polaris';

import { makeRequest } from '../../util';

export default function School_Create() {
  let history = useHistory();

  const [errors, setErrors] = useState({});
  const [school, setSchool] = useState({
    name: '',
    street: '',
    city: '',
    state: 'WA',
    zip: 0,
    type: 'Elementary School',
    image: ''
  });

  const handleInputChange = (field) => {
    return (value) => {
      setSchool({ ...school, [field]: value });
    };
  };

  const handleNumberChange = (field) => {
    return (value) => {
      if (!isNaN(value)) {
        setSchool({ ...school, [field]: Number(value) });
      }
    };
  };

  const handleSubmit = () => {
    setErrors({});
    let errorOBJ = {};
    if (school.name === undefined || school.name === '') {
      errorOBJ.name = 'Required';
    }
    if (school.street === undefined || school.street === '') {
      errorOBJ.street = 'Required';
    }
    if (school.city === undefined || school.city === '') {
      errorOBJ.city = 'Required';
    }
    if (school.image === undefined || school.image === '') {
      errorOBJ.image = 'Required';
    }
    if (school.zip === undefined || school.zip === 0) {
      errorOBJ.zip = 'Required';
    }
    if (Object.keys(errorOBJ).length > 0) {
      console.log(errorOBJ);
      setErrors(errorOBJ);
    } else {
      makeRequest('POST', '/school', { school })
        .then((data) => {
          history.push(`/Teacher/Schools/View/${data._id}`);
        })
        .catch((err) => {
          // TODO Error handling
          console.log(err);
        });
    }
  };

  const schoolTypes = useMemo(() => {
    return [
      { label: 'Elementary School', value: 'Elementary School' },
      { label: 'Middle School', value: 'Middle School' },
      { label: 'High School', value: 'High School' },
      { label: 'Community College', value: 'Community College' },
      { label: 'University', value: 'University' },
      { label: 'Private School', value: 'Private School' }
    ];
  }, []);

  const states = useMemo(() => {
    return [
      { label: 'WA', value: 'Washington' },
      { label: 'OR', value: 'Oregon' },
      { label: 'AL', value: 'Alabama' },
      { label: 'AK', value: 'Alaska' },
      { label: 'AZ', value: 'Arizona' },
      { label: 'AR', value: 'Arkansas' },
      { label: 'CA', value: 'California' },
      { label: 'CO', value: 'Colorado' },
      { label: 'CT', value: 'Connecticut' },
      { label: 'DE', value: 'Delaware' },
      { label: 'DC', value: 'District Of Columbia' },
      { label: 'FL', value: 'Florida' },
      { label: 'GA', value: 'Georgia' },
      { label: 'HI', value: 'Hawaii' },
      { label: 'ID', value: 'Idaho' },
      { label: 'IL', value: 'Illinois' },
      { label: 'IN', value: 'Indiana' },
      { label: 'IA', value: 'Iowa' },
      { label: 'KS', value: 'Kansas' },
      { label: 'KY', value: 'Kentucky' },
      { label: 'LA', value: 'Louisiana' },
      { label: 'ME', value: 'Maine' },
      { label: 'MD', value: 'Maryland' },
      { label: 'MA', value: 'Massachusetts' },
      { label: 'MI', value: 'Michigan' },
      { label: 'MN', value: 'Minnesota' },
      { label: 'MS', value: 'Mississippi' },
      { label: 'MO', value: 'Missouri' },
      { label: 'MT', value: 'Montana' },
      { label: 'NE', value: 'Nebraska' },
      { label: 'NV', value: 'Nevada' },
      { label: 'NH', value: 'New Hampshire' },
      { label: 'NJ', value: 'New Jersey' },
      { label: 'NM', value: 'New Mexico' },
      { label: 'NY', value: 'New York' },
      { label: 'NC', value: 'North Carolina' },
      { label: 'ND', value: 'North Dakota' },
      { label: 'OH', value: 'Ohio' },
      { label: 'OK', value: 'Oklahoma' },
      { label: 'PA', value: 'Pennsylvania' },
      { label: 'RI', value: 'Rhode Island' },
      { label: 'SC', value: 'South Carolina' },
      { label: 'SD', value: 'South Dakota' },
      { label: 'TN', value: 'Tennessee' },
      { label: 'TX', value: 'Texas' },
      { label: 'UT', value: 'Utah' },
      { label: 'VT', value: 'Vermont' },
      { label: 'VA', value: 'Virginia' },
      { label: 'WV', value: 'West Virginia' },
      { label: 'WI', value: 'Wisconsin' },
      { label: 'WY', value: 'Wyoming' }
    ];
  }, []);

  return (
    <Page
      full-width
      separator
      title="New School"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/Teacher'
        }
      ]}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <FormLayout.Group>
              <TextField
                type="text"
                label="Name"
                value={school.name}
                error={errors.name}
                onChange={handleInputChange('name')}
              />
              <Select
                label="Type"
                options={schoolTypes}
                value={school.type}
                onChange={handleInputChange('type')}
              />
            </FormLayout.Group>

            <FormLayout.Group>
              <TextField
                type="text"
                label="Street Address"
                value={school.street}
                error={errors.street}
                onChange={handleInputChange('street')}
              />
            </FormLayout.Group>
            <FormLayout.Group>
              <TextField
                type="text"
                label="City"
                value={school.city}
                error={errors.city}
                onChange={handleInputChange('city')}
              />
              <Select
                label="State"
                options={states}
                value={school.state}
                onChange={handleInputChange('state')}
              />
              <TextField
                value={school.zip !== 0 ? school.zip?.toString() : ''}
                error={errors.zip}
                onChange={handleNumberChange('zip')}
                type="text"
                label="Zip Code"
              />
            </FormLayout.Group>
            <FormLayout.Group>
              <TextField
                type="text"
                label="School Image"
                value={school.image}
                error={errors.image}
                onChange={handleInputChange('image')}
              />
            </FormLayout.Group>
            <FormLayout.Group>
              <Button onClick={handleSubmit}>Submit</Button>
            </FormLayout.Group>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
