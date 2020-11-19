import React, { useState, useEffect, useMemo } from 'react';

import moment from 'moment';

import {
  Page,
  Layout,
  Card,
  SkeletonBodyText,
  Heading,
  DataTable
} from '@shopify/polaris';

import useQuery from '../../hooks/useQuery';

import { makeRequest } from '../../util';

export default function Product_Schedule_View(props) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    makeRequest('GET', `/product/event/${props.match.params.id}`).then(
      (data) => {
        console.log(data);
        setData(data);
      }
    );
  }, []);

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
    </Page>
  );
}
