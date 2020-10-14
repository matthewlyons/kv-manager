import React, { useState, useEffect } from 'react';

import { MobileCancelMajorMonotone } from '@shopify/polaris-icons';
import {
  Heading,
  Checkbox,
  Sheet,
  Scrollable,
  Form,
  FormLayout,
  TextField,
  Select,
  Button
} from '@shopify/polaris';

export default function Modal_Teacher_Edit(props) {
  let { editModal, toggleModal, submit, hydrate } = props;

  const [school, setSchool] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setSchool(hydrate);
  }, [editModal]);

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

  const schoolTypes = [
    { label: 'Elementary School', value: 'Elementary School' },
    { label: 'Middle School', value: 'Middle School' },
    { label: 'High School', value: 'High School' },
    { label: 'Community College', value: 'Community College' },
    { label: 'University', value: 'University' },
    { label: 'Private School', value: 'Private School' }
  ];

  const states = [
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
      submit(school);
    }
  };
  return (
    <Sheet
      open={editModal}
      onClose={() => {
        toggleModal('edit');
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div
          style={{
            alignItems: 'center',
            borderBottom: '1px solid #DFE3E8',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '1.6rem',
            width: '100%'
          }}
        >
          <Heading>Edit School</Heading>
          <Button
            accessibilityLabel="Cancel"
            icon={MobileCancelMajorMonotone}
            onClick={() => {
              toggleModal('edit');
            }}
            plain
          />
        </div>
        <Scrollable style={{ padding: '1.6rem', height: '100%' }}>
          <Form onSubmit={handleSubmit}>
            <FormLayout.Group>
              <TextField
                value={school.name}
                error={errors.name}
                onChange={handleInputChange('name')}
                label="School Name"
                type="text"
              />
            </FormLayout.Group>
            <FormLayout.Group>
              <Select
                label="Type"
                options={schoolTypes}
                value={school.type}
                onChange={handleInputChange('type')}
              />
            </FormLayout.Group>
            <FormLayout.Group>
              <TextField
                value={school.street}
                error={errors.street}
                onChange={handleInputChange('street')}
                label="Street"
                type="text"
              />
            </FormLayout.Group>
            <FormLayout.Group>
              <TextField
                value={school.city}
                error={errors.city}
                onChange={handleInputChange('city')}
                label="City"
                type="text"
              />
            </FormLayout.Group>
            <FormLayout.Group>
              <Select
                label="State"
                options={states}
                value={school.state}
                onChange={handleInputChange('state')}
              />
            </FormLayout.Group>
            <FormLayout.Group>
              <TextField
                value={school.zip !== 0 ? school.zip?.toString() : ''}
                error={errors.zip}
                onChange={handleNumberChange('zip')}
                type="number"
                label="Zip Code"
              />
            </FormLayout.Group>

            <FormLayout.Group>
              <TextField
                value={school.image}
                error={errors.image}
                onChange={handleInputChange('image')}
                label="School Image"
                type="text"
                helpText={
                  <span>
                    This is the image that will show on the school's rental
                    page.
                  </span>
                }
              />
            </FormLayout.Group>
            <FormLayout.Group>
              <Button submit>Save</Button>
            </FormLayout.Group>
          </Form>
        </Scrollable>
      </div>
    </Sheet>
  );
}
