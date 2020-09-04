import React from 'react';

import {
  Page,
  Layout,
  Heading,
  Card,
  ResourceList,
  ResourceItem,
  Scrollable,
  TextStyle
} from '@shopify/polaris';

export default function Shipping_Estimates(props) {
  let { shippingRates, selectRate, deselectRate } = props;

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
            <Scrollable shadow style={{ height: '500px' }}>
              <ResourceList
                resourceName={{ singular: 'rate', plural: 'rates' }}
                items={shippingRates}
                renderItem={(item, i) => {
                  const { _id, destination, rates } = item;

                  let ShippingPrices = rates.map((rate) => {
                    return `$${(rate.total_price * 0.01).toFixed(2)}`;
                  });

                  return (
                    <ResourceList.Item
                      id={_id}
                      onClick={() => {
                        selectRate(i);
                      }}
                    >
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
            </Scrollable>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
