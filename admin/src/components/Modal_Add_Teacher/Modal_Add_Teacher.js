import React, { useState, useEffect } from 'react';

import { Modal, FormLayout, Select } from '@shopify/polaris';

import { makeRequest } from '../../util';

export default function Modal_Add_Teacher(props) {
  let { addTeacherModal, toggleModal, schoolTeachers, addTeacher } = props;

  const [teachers, setTeachers] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (addTeacherModal) {
      makeRequest('GET', `/teacher`).then((data) => {
        let teacherArray = schoolTeachers.map((e) => e._id);
        let filteredTeachers = data.filter(
          (teacher) => teacherArray.indexOf(teacher._id) === -1
        );
        setTeachers(filteredTeachers);
        let options = filteredTeachers.map((teacher, i) => {
          let teacherName =
            teacher.title != 'N/A' && teacher.title
              ? `${teacher.title}. ${teacher.firstName} ${teacher.lastName}`
              : `${teacher.firstName} ${teacher.lastName}`;
          return {
            label: teacherName,
            value: i
          };
        });
        setTeacherList(options);
      });
    }
  }, [addTeacherModal]);

  const submit = () => {
    addTeacher(teachers[selected]);
  };

  const handleInputChange = (value) => {
    setSelected(Number(value));
  };

  return (
    <Modal
      open={addTeacherModal}
      onClose={() => toggleModal('addTeacher')}
      title="Add a Teacher"
      primaryAction={{
        content: 'Add',
        onAction: submit
      }}
    >
      <Modal.Section>
        <FormLayout>
          <Select
            label="Teachers"
            options={teacherList}
            value={selected}
            onChange={handleInputChange}
          />
        </FormLayout>
      </Modal.Section>
    </Modal>
  );
}
