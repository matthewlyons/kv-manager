import React, { useState, useEffect, useMemo } from 'react';

import moment from 'moment';

import { useHistory } from 'react-router-dom';

import {
  Page,
  Layout,
  Card,
  SkeletonBodyText,
  Heading,
  Modal
} from '@shopify/polaris';

import useQuery from '../../hooks/useQuery';

import { makeRequest } from '../../util';

export default function Product_Schedule_View(props) {
  let history = useHistory();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleModal = (modal) => {
    switch (modal) {
      case 'delete':
        setDeleteModal(!deleteModal);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    makeRequest('GET', `/product/event/${props.match.params.id}`).then(
      (data) => {
        console.log(data);
        setData(data);
      }
    );
  }, []);

  const deleteEvent = () => {
    makeRequest('DELETE', `/product/event/${props.match.params.id}`).then(
      (data) => {
        console.log(data);
        history.push(`/Product/Schedule/`);
      }
    );
  };

  return (
    <Page
      full-width
      separator
      title={loading ? 'Edit Product' : `Edit Product: ${data.shopifyID}`}
      breadcrumbs={[
        {
          content: 'Back',
          url: '/Product/Schedule'
        }
      ]}
      primaryAction={{ content: 'Push Changes Now' }}
      secondaryActions={[
        {
          content: 'Delete Event',
          onAction: () => {
            toggleModal('delete');
          }
        },
        {
          content: 'Edit Event'
        }
      ]}
    >
      <Layout>
        {loading ? (
          <Layout.Section>
            <Card sectioned>
              <SkeletonBodyText />
            </Card>
          </Layout.Section>
        ) : (
          <React.Fragment>
            <Layout.Section oneThird>
              <Heading>Event Information</Heading>
            </Layout.Section>
            <Layout.Section oneThird>
              <Card sectioned>
                <Heading>Status</Heading>
                <p>{data.active ? 'Active' : 'Inactive'}</p>
              </Card>
            </Layout.Section>
            <Layout.Section oneThird>
              <Card sectioned>
                <Heading>Date Range</Heading>
                <p>
                  {moment(data.start).format('MM/DD/YYYY')} -{' '}
                  {moment(data.end).format('MM/DD/YYYY')}
                </p>
              </Card>
            </Layout.Section>
            <Layout.Section oneHalf>
              <Heading>Standard</Heading>
            </Layout.Section>
            <Layout.Section oneHalf>
              <Heading>Event</Heading>
            </Layout.Section>

            <Layout.Section oneHalf>
              <Card sectioned>
                <Heading>Title</Heading>
                <p>{data.current?.admin.title}</p>
              </Card>
            </Layout.Section>
            <Layout.Section oneHalf>
              <Card sectioned>
                <Heading>Title</Heading>
                <p>{data.event?.admin.title}</p>
              </Card>
            </Layout.Section>
            <Layout.Section oneHalf>
              <Card sectioned>
                <Heading>Description</Heading>
                <p>{data.current?.admin.body_html}</p>
              </Card>
            </Layout.Section>
            <Layout.Section oneHalf>
              <Card sectioned>
                <Heading>Description</Heading>
                <p>{data.event?.admin.body_html}</p>
              </Card>
            </Layout.Section>
            {data.event?.admin.image?.url && (
              <React.Fragment>
                <Layout.Section oneHalf>
                  <Card sectioned>
                    <Heading>Image</Heading>
                    <p></p>
                  </Card>
                </Layout.Section>
                <Layout.Section oneHalf>
                  <Card sectioned>
                    <Heading>Image</Heading>
                    <p>{data.event?.admin.image?.url}</p>
                  </Card>
                </Layout.Section>
              </React.Fragment>
            )}

            {data.current?.variants.map((variant, i) => {
              let event = data.event.variants[i];
              return (
                <React.Fragment key={i}>
                  <Layout.Section oneHalf>
                    <Card sectioned>
                      <Heading>Variant</Heading>
                      <p>
                        Price: ${variant.price} | Compare At Price: $
                        {variant.compare_at_price}
                      </p>
                    </Card>
                  </Layout.Section>
                  <Layout.Section oneHalf>
                    <Card sectioned>
                      <Heading>Variant</Heading>
                      <p>
                        Price: ${event.price} | Compare At Price: $
                        {event.compare_at_price}
                      </p>
                    </Card>
                  </Layout.Section>
                </React.Fragment>
              );
            })}

            {data.current?.metafields.map((metafield, i) => {
              let event = data.event.metafields[i];
              return (
                <React.Fragment key={i}>
                  <Layout.Section oneHalf>
                    <Card sectioned>
                      <Heading>{metafield.key}</Heading>
                      <p>{metafield.value}</p>
                    </Card>
                  </Layout.Section>
                  <Layout.Section oneHalf>
                    <Card sectioned>
                      <Heading>{metafield.key}</Heading>
                      <p>{event.value}</p>
                    </Card>
                  </Layout.Section>
                </React.Fragment>
              );
            })}
          </React.Fragment>
        )}
      </Layout>
      <Modal
        open={deleteModal}
        onClose={() => {
          toggleModal('delete');
        }}
        title="Are you sure?"
        primaryAction={{
          content: 'Delete',
          onAction: deleteEvent
        }}
      />
    </Page>
  );
}
