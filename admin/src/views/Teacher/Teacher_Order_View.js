import React, { useEffect, useState, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import {
  Page,
  Layout,
  Card,
  TextContainer,
  Modal,
  FormLayout,
  Select,
  TextField,
  ResourceList,
  ResourceItem,
  TextStyle
} from '@shopify/polaris';
import { makeRequest } from '../../util';
import AreYouSure from '../../components/AreYouSure';
export default function Teacher_Order_View() {
  let history = useHistory();
  let { id } = useParams();

  useEffect(() => {
    makeRequest('GET', `/teacher-store/orders/${id}`).then((data) => {
      setStatus(data.status);
      setOrder(data);
      console.log(data);
    });
  }, []);

  const toggleModal = (modal) => {
    switch (modal) {
      case 'status':
        setStatusModal(!statusModal);
        break;
      default:
        break;
    }
  };

  const [order, setOrder] = useState({});
  const [status, setStatus] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);

  const deleteOrder = () => {
    makeRequest('delete', `/teacher-store/orders/${id}`).then((data) => {
      history.goBack();
    });
  };

  const handleInputChange = (field) => {
    return (value) => {
      setOrder({ ...order, [field]: value });
    };
  };

  const submitStatus = () => {
    setOrder({ ...order, status: status });
    toggleModal('status');
  };
  const submitOrder = () => {
    makeRequest('put', `/teacher-store/orders/${id}`, order).then((data) => {
      history.goBack();
    });
  };

  const shippingActive = useMemo(() => {
    return order.status === 'Shipped' || status === 'Shipped';
  }, [order.status, status]);

  return (
    <Page
      full-width
      separator
      title="View Order"
      breadcrumbs={[
        {
          content: 'Back',
          onAction: () => {
            history.goBack();
          }
        }
      ]}
      secondaryActions={[
        {
          content: 'Delete Order',
          onAction: () => {
            setDeleteModal(true);
          }
        },
        {
          content: 'Update Order',
          onAction: submitOrder
        }
      ]}
    >
      <Layout>
        <Layout.Section>
          <Card
            title="Teacher Info"
            actions={[
              {
                content: 'View Shopify Customer',
                url: `/admin/customers/${order.teacher?.shopifyID}`
              }
            ]}
          >
            <Card.Section>
              <TextContainer>
                Name: {order.teacher?.firstName} {order.teacher?.lastName}
              </TextContainer>
              <TextContainer>Email: {order.teacher?.email}</TextContainer>
              <TextContainer>Code: {order.teacher?.code}</TextContainer>
            </Card.Section>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card
            title="Order Info"
            actions={[
              {
                content: 'Edit',
                onAction: () => {
                  toggleModal('status');
                }
              }
            ]}
          >
            <Card.Section>
              <TextContainer>Status: {order.status}</TextContainer>
              <TextContainer>
                <br />
                Total Points: {order.total}
              </TextContainer>
            </Card.Section>
          </Card>
        </Layout.Section>
        {order.products?.length > 0 && (
          <Layout.Section>
            <Card>
              <ResourceList
                resourceName={{ singular: 'customer', plural: 'customers' }}
                items={order.products}
                renderItem={(item, index) => {
                  const { _id, title, quantity, points } = item;
                  return (
                    <ResourceItem id={_id}>
                      <h3>
                        <TextStyle variation="strong">{title}</TextStyle>
                      </h3>
                      <div>
                        {points} Points x {quantity} | {points * quantity}{' '}
                        Points Total
                      </div>
                    </ResourceItem>
                  );
                }}
              />
            </Card>
          </Layout.Section>
        )}
      </Layout>
      <Modal>
        <h1>Hello</h1>
      </Modal>
      <Modal
        open={statusModal}
        onClose={() => {
          setStatusModal(false);
        }}
        title="Update Status"
        primaryAction={{
          content: 'Submit',
          onAction: submitStatus
        }}
      >
        <Modal.Section>
          <FormLayout>
            <FormLayout.Group>
              <Select
                options={[
                  { label: 'Processing', value: 'Processing' },
                  { label: 'Received', value: 'Received' },
                  { label: 'Shipped', value: 'Shipped' },
                  { label: 'Complete', value: 'Complete' }
                ]}
                value={status}
                onChange={(e) => {
                  setStatus(e);
                }}
                label="Status"
              />
            </FormLayout.Group>
            {shippingActive && (
              <FormLayout.Group>
                <TextField
                  value={order.trackingNumber}
                  onChange={handleInputChange('trackingNumber')}
                  label="Tracking Number"
                  type="text"
                />
              </FormLayout.Group>
            )}
          </FormLayout>
        </Modal.Section>
      </Modal>
      <AreYouSure
        open={deleteModal}
        close={() => {
          setDeleteModal(false);
        }}
        action={deleteOrder}
      />
    </Page>
  );
}
