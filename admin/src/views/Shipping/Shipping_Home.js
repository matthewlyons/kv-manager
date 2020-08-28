import React, { useState, useEffect } from 'react';

import {
  Page,
  Layout,
  Heading,
  Card,
  ResourceList,
  ResourceItem,
  TextStyle
} from '@shopify/polaris';

import { makeRequest } from '../../util';

export default function Shipping_Home() {
  const [shippingRates, setShippingRates] = useState([]);

  useEffect(() => {
    makeRequest('get', '/shipping/quotes').then((data) => {
      console.log(data);
      setShippingRates(data);
    });
  }, []);

  return (
    <Page
      full-width
      separator
      title="Shipping"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/'
        }
      ]}
      primaryAction={{
        content: 'View Carrier Services',
        url: '/Shipping/Services'
      }}
    >
      <Layout>
        <Layout.Section secondary>
          <Heading>Shipping Rates</Heading>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={{ singular: 'rate', plural: 'rates' }}
              items={shippingRates}
              renderItem={(item) => {
                const { _id, destination, rates } = item;
                const url = '/Shipping/Rate/' + _id;

                let ShippingPrices = rates.map((rate) => {
                  return `$${rate.total_price * 0.01}`;
                });

                return (
                  <ResourceList.Item id={_id} url={url}>
                    <h3>
                      <TextStyle variation="strong">
                        {destination.city}, {destination.province}
                      </TextStyle>
                    </h3>
                    <div>{ShippingPrices.join(', ')}</div>
                  </ResourceList.Item>
                );
              }}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
