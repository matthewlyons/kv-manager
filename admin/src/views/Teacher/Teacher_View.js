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
  TextContainer,
  Button,
  TextField
} from '@shopify/polaris';

import moment from 'moment';

import * as yup from 'yup';

import { makeRequest } from '../../util';
import Modal_Teacher_Edit from '../../components/Modal_Teacher_Edit';

const emailSchema = yup.string().email();

export default function Teacher_View(props) {
  let history = useHistory();

  const [loading, setLoading] = useState(true);

  const [teacher, setTeacher] = useState({});
  const [payments, setPayments] = useState([]);

  const [errors, setErrors] = useState({});
  const [orders, setOrders] = useState([]);
  const [email, setEmail] = useState('');

  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [accountModal, setAccountModal] = useState(false);

  useEffect(() => {
    makeRequest('GET', `/teacher/${props.match.params.id}`).then((data) => {
      setTeacher(data);
      console.log(data);
      setLoading(false);
    });
    makeRequest('GET', `/teacher/points/${props.match.params.id}`).then(
      (data) => {
        console.log(data);
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
      case 'account':
        setAccountModal(!accountModal);
        break;
      default:
        break;
    }
  };

  const submitEmail = () => {
    setErrors({});
    let errorOBJ = {};
    if (email === undefined || email === '') {
      errorOBJ.email = 'Required';
    } else if (!emailSchema.isValidSync(email)) {
      errorOBJ.email = 'Not Valid';
    }
    if (Object.keys(errorOBJ).length > 0) {
      setErrors(errorOBJ);
    } else {
      makeRequest('POST', `/teacher/account/${props.match.params.id}`, {
        email
      })
        .then((data) => {
          console.log(data);
          toggleModal('account');
        })
        .catch((err) => {
          setErrors({ email: err });
        });
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
          secondaryActions={[
            {
              content: 'Change Shopify Account',
              onAction: () => {
                toggleModal('account');
              }
            }
          ]}
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
              <Heading>Orders</Heading>
              <Button url={`/Teacher/Orders/Create/${props.match.params.id}`}>
                Add New
              </Button>
            </Layout.Section>
            <Layout.Section>
              <Card>
                <ResourceList
                  resourceName={{ singular: 'order', plural: 'orders' }}
                  items={teacher.orders}
                  renderItem={(item) => {
                    const { _id, total, date, products } = item;

                    let items;

                    if (products.length > 1) {
                      items = products.reduce((total, current) => {
                        return `${current.quantity}x ${current.title} | ${total}`;
                      }, '');
                    } else {
                      items = `${products[0].quantity}x ${products[0].title} | `;
                    }
                    // Truncate Items list after 200 characters
                    items =
                      items.length > 200
                        ? items.substring(0, 200) + '...'
                        : items;
                    return (
                      <ResourceList.Item
                        id={_id}
                        url={`/Teacher/Orders/View/${_id}`}
                      >
                        <h3>
                          <TextStyle variation="strong">
                            {items}
                            {total} Points
                          </TextStyle>
                        </h3>
                        <div>{moment(date).format('MM/DD/YYYY')}</div>
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
          <Modal
            open={accountModal}
            onClose={() => {
              toggleModal('account');
            }}
            title="Change Shopify Account for Teacher"
            primaryAction={{
              content: 'Submit',
              onAction: submitEmail
            }}
          >
            <Modal.Section>
              <TextField
                label="New Email"
                error={errors.email}
                value={email}
                onChange={setEmail}
                type="text"
              />
            </Modal.Section>
          </Modal>
        </Page>
      )}
    </React.Fragment>
  );
}
