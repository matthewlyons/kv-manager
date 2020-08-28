import React, { useEffect, useState, useMemo } from 'react';

import { useHistory } from 'react-router-dom';
import {
  Card,
  Page,
  Modal,
  Layout,
  Heading,
  ResourceList,
  TextStyle,
  SkeletonPage,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer
} from '@shopify/polaris';

import { makeRequest } from '../../util';
import Modal_School_Edit from '../../components/Modal_School_Edit';
import Modal_Add_Teacher from '../../components/Modal_Add_Teacher';
import Modal_Add_Class from '../../components/Modal_Add_Class';

export default function School_View(props) {
  let history = useHistory();

  const [loading, setLoading] = useState(true);

  const [school, setSchool] = useState({});
  const [teachers, setTeachers] = useState([]);

  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addTeacherModal, setAddTeacherModal] = useState(false);
  const [addClassModal, setAddClassModal] = useState(false);

  useEffect(() => {
    makeRequest('GET', `/school/${props.match.params.id}`).then((data) => {
      setSchool(data);
      console.log(data);
      setLoading(false);
    });
  }, []);

  const toggleModal = (modal) => {
    switch (modal) {
      case 'delete':
        setDeleteModal(!deleteModal);
        break;
      case 'edit':
        setEditModal(!editModal);
        break;
      case 'addTeacher':
        setAddTeacherModal(!addTeacherModal);
        break;
      case 'addClass':
        setAddClassModal(!addClassModal);
        break;
      default:
        break;
    }
  };

  const submit = (updatedSchool) => {
    console.log(updatedSchool);
  };

  const addClass = (classData) => {
    let updatedClasses = [...school.classList, classData];
    let updatedSchool = { ...school, classList: updatedClasses };
    makeRequest('PUT', `/school/${props.match.params.id}`, updatedSchool).then(
      (data) => {
        setSchool({ ...school, classList: updatedClasses });
        toggleModal('addClass');
      }
    );
  };
  const removeClass = (classIndex) => {
    console.log(classIndex);
    let updatedClasses = [...school.classList];
    updatedClasses.splice(classIndex, 1);
    let updatedSchool = { ...school, classList: updatedClasses };
    makeRequest('PUT', `/school/${props.match.params.id}`, updatedSchool).then(
      (data) => {
        setSchool({ ...school, classList: updatedClasses });
      }
    );
    setSchool({ ...school, classList: updatedClasses });
  };

  const openClassModal = () => {
    if (school.teachers.length > 0) {
      toggleModal('addClass');
    } else {
      // TODO Error handling
      console.log('Add a teacher before adding a class');
    }
  };

  const removeTeacher = (teacher) => {
    let payload = { school: school._id, teacher };
    makeRequest('DELETE', `/teacher/link`, payload).then((data) => {
      let updatedTeachers = [...school.teachers];
      let teacherIndex = updatedTeachers.map((e) => e._id).indexOf(teacher);
      updatedTeachers.splice(teacherIndex, 1);
      setSchool({ ...school, teachers: updatedTeachers });
    });
  };

  const addTeacher = (teacher) => {
    let payload = { school: school._id, teacher: teacher._id };
    makeRequest('POST', `/teacher/link`, payload).then((data) => {
      let updatedTeachers = [...school.teachers, teacher];
      setSchool({ ...school, teachers: updatedTeachers });
      toggleModal('addTeacher');
    });
  };

  const name = useMemo(() => {
    return `${school.name} ${school.type}`;
  }, [school.name]);

  return (
    <React.Fragment>
      {loading ? (
        <SkeletonPage primaryAction full-width>
          <Layout>
            <Layout.Section>
              <Card sectioned>
                <TextContainer>
                  <SkeletonDisplayText size="small" />
                  <SkeletonBodyText />
                </TextContainer>
              </Card>
              <Card sectioned>
                <TextContainer>
                  <SkeletonDisplayText size="small" />
                  <SkeletonBodyText />
                </TextContainer>
              </Card>
            </Layout.Section>
            <Layout.Section secondary>
              <Card sectioned>
                <TextContainer>
                  <SkeletonDisplayText size="small" />
                  <SkeletonBodyText />
                </TextContainer>
              </Card>
            </Layout.Section>
            <Layout.Section>
              <Card sectioned>
                <TextContainer>
                  <SkeletonDisplayText size="small" />
                  <SkeletonBodyText />
                </TextContainer>
              </Card>
            </Layout.Section>
          </Layout>
        </SkeletonPage>
      ) : (
        <Page
          full-width
          separator
          title={name}
          breadcrumbs={[
            {
              content: 'Back',
              onAction: () => {
                history.goBack();
              }
            }
          ]}
          primaryAction={{
            content: 'Delete School',
            onAction: () => {
              toggleModal('delete');
            }
          }}
          secondaryActions={[
            {
              content: 'Edit',
              onAction: () => {
                toggleModal('edit');
              }
            }
          ]}
        >
          <Layout>
            <Layout.Section>
              <Card
                title="Teachers"
                sectioned
                actions={[
                  {
                    content: 'Add teacher',
                    onAction: () => {
                      toggleModal('addTeacher');
                    }
                  }
                ]}
              >
                <ResourceList
                  resourceName={{ singular: 'customer', plural: 'customers' }}
                  items={school.teachers}
                  renderItem={(item, ID, i) => {
                    const shortcutActions = [
                      {
                        content: 'Remove',
                        onClick: () => {
                          removeTeacher(item._id);
                        }
                      }
                    ];

                    const { firstName, lastName, title, _id } = item;
                    const name = title + ' ' + firstName + ' ' + lastName;
                    const url = '/Teacher/View/' + _id;

                    return (
                      <ResourceList.Item
                        url={url}
                        id={_id}
                        accessibilityLabel={`View details for ${name}`}
                        shortcutActions={shortcutActions}
                      >
                        <h3>
                          <TextStyle variation="strong">{name}</TextStyle>
                        </h3>
                      </ResourceList.Item>
                    );
                  }}
                />
              </Card>
              <Card
                title="Classes"
                sectioned
                actions={[
                  {
                    content: 'Add class',
                    onAction: () => {
                      openClassModal();
                    }
                  }
                ]}
              >
                <ResourceList
                  resourceName={{ singular: 'customer', plural: 'customers' }}
                  items={school.classList}
                  renderItem={(item, ID, i) => {
                    const { id, className } = item;

                    const shortcutActions = [
                      {
                        content: 'Remove',
                        onClick: () => {
                          removeClass(i);
                        }
                      }
                    ];

                    return (
                      <ResourceList.Item
                        id={id}
                        accessibilityLabel={`View details for ${className}`}
                        shortcutActions={shortcutActions}
                      >
                        <h3>
                          <TextStyle variation="strong">{className}</TextStyle>
                        </h3>
                      </ResourceList.Item>
                    );
                  }}
                />
              </Card>
            </Layout.Section>
            <Layout.Section secondary>
              <Card title="Address" sectioned>
                <p>
                  {school.street} {school.city}, {school.state}
                </p>
              </Card>
            </Layout.Section>
            <Layout.Section>
              <Card title="Notes" sectioned actions={[{ content: 'Add Note' }]}>
                <p>
                  {school.street} {school.city}, {school.state}
                </p>
              </Card>
            </Layout.Section>
          </Layout>
          <Modal
            open={deleteModal}
            onClose={() => {
              toggleModal('delete');
            }}
            title="Are you sure?"
            primaryAction={{
              content: 'Delete'
            }}
          />
          <Modal_School_Edit
            editModal={editModal}
            toggleModal={toggleModal}
            submit={submit}
            hydrate={school}
          />
          <Modal_Add_Teacher
            addTeacherModal={addTeacherModal}
            toggleModal={toggleModal}
            addTeacher={addTeacher}
            schoolTeachers={school.teachers}
          />
          <Modal_Add_Class
            addClassModal={addClassModal}
            addClass={addClass}
            toggleModal={toggleModal}
            teachers={school.teachers}
          />
        </Page>
      )}
    </React.Fragment>
  );
}
