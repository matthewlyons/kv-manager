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
import Modal_Teacher_Edit from '../../components/Modal_Teacher_Edit';

export default function Teacher_View(props) {
  let history = useHistory();

  const [loading, setLoading] = useState(true);

  const [teacher, setTeacher] = useState({});
  const [payments, setPayments] = useState([]);
  const [orders, setOrders] = useState([]);

  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    makeRequest('GET', `/teacher/${props.match.params.id}`).then((data) => {
      setTeacher(data);
      setLoading(false);
    });
    makeRequest('GET', `/teacher/points/${props.match.params.id}`).then(
      (data) => {
        setPayments(data);
      }
    );
  }, []);

  const toggleModal = (modal) => {
    switch (modal) {
      case 'delete':
        setDeleteModal(!deleteModal);
        break;
      case 'edit':
        setEditModal(!editModal);
        break;
      default:
        break;
    }
  };

  const submit = (updatedTeacher) => {
    makeRequest('put', `/teacher/${props.match.params.id}`, updatedTeacher)
      .then((data) => {
        setTeacher(updatedTeacher);
        setEditModal(false);
        // TODO Success
      })
      .catch((err) => {
        // TODO Error handling
        console.log(err);
      });
  };

  const name = useMemo(() => {
    let result =
      teacher.title != 'N/A' && teacher.title
        ? `${teacher.title}. ${teacher.firstName} ${teacher.lastName}`
        : `${teacher.firstName} ${teacher.lastName}`;
    return result;
  }, [teacher]);

  const loyaltyPoints = useMemo(() => {
    let properName =
      teacher.title != 'N/A' && teacher.title
        ? `${teacher.title}. ${teacher.lastName}`
        : `${teacher.firstName} ${teacher.lastName}`;
    let result = `${properName} has ${teacher.points} Loyalty Points`;
    return result;
  }, [teacher]);

  return (
    <React.Fragment>
      {loading ? (
        <SkeletonPage primaryAction full-width>
          <Layout>
            <Layout.Section secondary>
              <SkeletonDisplayText size="small" />
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
            content: 'Delete Teacher',
            onAction: () => {
              toggleModal('delete');
            }
          }}
        >
          <Layout>
            <Layout.Section secondary>
              <Heading>Summary</Heading>
            </Layout.Section>
            <Layout.Section>
              <Card
                sectioned
                title={loyaltyPoints}
                actions={[
                  {
                    content: 'Edit',
                    onAction: () => {
                      toggleModal('edit');
                    }
                  }
                ]}
              >
                <p>Teacher Code: {teacher.code}</p>
              </Card>
            </Layout.Section>
            {teacher.schools.length > 0 && (
              <React.Fragment>
                <Layout.Section secondary>
                  <Heading>Connected Schools</Heading>
                </Layout.Section>
                <Layout.Section>
                  <Card>
                    <ResourceList
                      resourceName={{ singular: 'school', plural: 'schools' }}
                      items={teacher.schools}
                      renderItem={(item) => {
                        const { _id, name } = item;
                        const url = '/school/view/' + _id;

                        return (
                          <ResourceList.Item id={_id} url={url}>
                            <h3>
                              <TextStyle variation="strong">{name}</TextStyle>
                            </h3>
                          </ResourceList.Item>
                        );
                      }}
                    />
                  </Card>
                </Layout.Section>
              </React.Fragment>
            )}
            <Layout.Section secondary>
              <Heading>Recent Point History</Heading>
            </Layout.Section>
            <Layout.Section>
              <Card>
                <ResourceList
                  resourceName={{ singular: 'payment', plural: 'payments' }}
                  items={payments}
                  renderItem={(item) => {
                    const { _id, points, date, type, orderNumber } = item;
                    return (
                      <ResourceList.Item id={_id}>
                        <h3>
                          <TextStyle variation="strong">
                            {points} Points
                          </TextStyle>
                        </h3>
                      </ResourceList.Item>
                    );
                  }}
                />
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

          <Modal_Teacher_Edit
            editModal={editModal}
            toggleModal={toggleModal}
            submit={submit}
            hydrate={teacher}
          />
        </Page>
      )}
    </React.Fragment>
  );
}
