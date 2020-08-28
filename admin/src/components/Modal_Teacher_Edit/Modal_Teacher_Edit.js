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

  const [teacher, setTeacher] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTeacher(hydrate);
  }, [editModal]);

  const handleInputChange = (field) => {
    return (value) => {
      setTeacher({ ...teacher, [field]: value });
    };
  };
  const handleNumberChange = (field) => {
    return (value) => {
      setTeacher({ ...teacher, [field]: Number(value) });
    };
  };

  const options = [
    { label: 'Mr', value: 'Mr' },
    { label: 'Ms', value: 'Ms' },
    { label: 'Mrs', value: 'Mrs' },
    { label: 'Dr', value: 'Dr' },
    { label: 'Prof', value: 'Prof' },
    { label: 'N/A', value: 'N/A' }
  ];

  const handleSubmit = () => {
    setErrors({});
    let errorOBJ = {};
    if (teacher.firstName === undefined || teacher.firstName === '') {
      errorOBJ.firstName = 'Required';
    }
    if (teacher.lastName === undefined || teacher.lastName === '') {
      errorOBJ.lastName = 'Required';
    }
    if (teacher.code === undefined || teacher.code === '') {
      errorOBJ.code = 'Required';
    }

    if (Object.keys(errorOBJ).length > 0) {
      setErrors(errorOBJ);
    } else {
      submit(teacher);
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
          <Heading>Edit Teacher</Heading>
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
                label="Teacher Points"
                error={errors.points}
                value={teacher.points?.toString()}
                onChange={handleNumberChange('points')}
                type="number"
              />
            </FormLayout.Group>
            <FormLayout.Group>
              <Checkbox
                checked={teacher.pinned}
                label="Pinned To Homepage?"
                onChange={handleInputChange('pinned')}
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
