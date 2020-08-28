import React, { useEffect, useMemo, useState } from 'react';

import { MobileCancelMajorMonotone } from '@shopify/polaris-icons';
import {
  Heading,
  Checkbox,
  Form,
  FormLayout,
  Select,
  TextField,
  Sheet,
  Button,
  Scrollable
} from '@shopify/polaris';

export default function Modal_Add_Class(props) {
  let { addClassModal, toggleModal, teachers, addClass } = props;

  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (addClassModal) {
      setData({ teacher: teachers[0]._id });
    } else {
      setData({});
    }
  }, [addClassModal]);

  let teacherOptions = useMemo(() => {
    let result = teachers.map((teacher) => {
      let teacherName =
        teacher.title != 'N/A' && teacher.title
          ? `${teacher.title}. ${teacher.firstName} ${teacher.lastName}`
          : `${teacher.firstName} ${teacher.lastName}`;
      return { value: teacher._id, label: teacherName };
    });
    return result;
  });

  const handleInputChange = (field) => {
    return (value) => {
      setData({ ...data, [field]: value });
    };
  };

  const submit = () => {
    setErrors({});
    let errorOBJ = {};
    if (data.className === undefined || data.className === '') {
      errorOBJ.className = 'Required';
    }
    if (data.book === undefined || data.book === '') {
      errorOBJ.book = 'Required';
    }

    if (Object.keys(errorOBJ).length > 0) {
      setErrors(errorOBJ);
    } else {
      addClass(data);
    }
  };

  return (
    <Sheet
      open={addClassModal}
      onClose={() => {
        toggleModal('addClass');
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
          <Heading>Add a Class</Heading>
          <Button
            accessibilityLabel="Cancel"
            icon={MobileCancelMajorMonotone}
            onClick={() => {
              toggleModal('addClass');
            }}
            plain
          />
        </div>
        <Scrollable style={{ padding: '1.6rem', height: '100%' }}>
          <Form onSubmit={submit}>
            <FormLayout.Group>
              <TextField
                value={data.className}
                error={errors.className}
                onChange={handleInputChange('className')}
                label="Class Name"
                type="text"
              />
            </FormLayout.Group>

            <FormLayout.Group>
              <Select
                label="Teacher"
                options={teacherOptions}
                value={data.teacher}
                onChange={handleInputChange('teacher')}
              />
            </FormLayout.Group>

            <FormLayout.Group>
              <TextField
                value={data.book}
                error={errors.book}
                onChange={handleInputChange('book')}
                label="Included Book"
                type="text"
              />
            </FormLayout.Group>

            <FormLayout.Group>
              <TextField
                value={data.note}
                error={errors.note}
                onChange={handleInputChange('note')}
                label="Class Note"
                type="text"
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
