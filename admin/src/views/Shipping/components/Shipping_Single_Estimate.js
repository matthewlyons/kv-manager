import React from 'react';

import {
  Page,
  Layout,
  Heading,
  Card,
  ResourceList,
  TextStyle
} from '@shopify/polaris';

export default function Shipping_Single_Estimate(props) {
  let { rate, deselectRate, nextRate, prevRate } = props;
  let { destination, items, packages, rates } = rate;
  return (
    <Page
      full-width
      title={`${destination.city}, ${destination.province} | ${destination.postal_code}`}
      breadcrumbs={[
        {
          content: 'Back',
          onAction: deselectRate
        }
      ]}
      pagination={{
        hasPrevious: true,
        onPrevious: () => {
          prevRate();
        },
        hasNext: true,
        onNext: () => {
          nextRate();
        }
      }}
    >
      <Layout>
        <Layout.Section secondary>
          <Heading>Items In Order</Heading>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={{ singular: 'rate', plural: 'rates' }}
              items={items}
              renderItem={(item, i) => {
                const { name, quantity } = item;
                return (
                  <ResourceList.Item>
                    <TextStyle variation="strong">
                      {quantity} x {name}
                    </TextStyle>
                  </ResourceList.Item>
                );
              }}
            />
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Heading>Estimated Packages</Heading>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={{ singular: 'rate', plural: 'rates' }}
              items={packages}
              renderItem={(item, i) => {
                const { dimensions, weight } = item;
                const { length, width, height } = dimensions;
                return (
                  <ResourceList.Item>
                    <TextStyle variation="strong">
                      {length}" L x {width}" W x {height}" H
                    </TextStyle>
                    <div>{weight.value} Ounces</div>
                  </ResourceList.Item>
                );
              }}
            />
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Heading>Estimated Rates</Heading>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={{ singular: 'rate', plural: 'rates' }}
              items={rates}
              renderItem={(item, i) => {
                const { service_name, total_price } = item;
                return (
                  <ResourceList.Item>
                    <TextStyle variation="strong">{service_name}</TextStyle>
                    <div>
                      {total_price > 0
                        ? `$${(total_price * 0.01).toFixed(2)}`
                        : total_price}
                    </div>
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
