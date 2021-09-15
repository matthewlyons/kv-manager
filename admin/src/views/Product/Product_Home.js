import React from 'react';

import { Page, Layout, Card } from '@shopify/polaris';

import { makeRequest } from '../../util';

export default function Product_Home() {
  const updateDatabase = () => {
    alert('Starting');
    makeRequest('GET', `/shopify-products`).then((data) => {
      console.log(data);
      alert('Done');
    });
  };

  return (
    <Page
      full-width
      separator
      title="Products"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/'
        }
      ]}
      primaryAction={{
        content: 'Update Database',
        onAction: () => {
          updateDatabase();
        }
      }}
    >
      <Layout>
        <Layout.Section oneHalf>
          <Card
            title="Inventory"
            sectioned
            primaryFooterAction={{
              content: 'Manage',
              url: '/Product/InvetoryGroups'
            }}
          >
            <p>Manage Leader - Follower Inventory Groups</p>
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card
            title="Customizer"
            sectioned
            primaryFooterAction={{
              content: 'Manage',
              url: '/Product/Customizer'
            }}
          >
            <p>Manage Product Customizer Groups</p>
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card
            title="Schedule"
            sectioned
            primaryFooterAction={{
              content: 'Manage',
              url: '/Product/Schedule'
            }}
          >
            <p>Schedule Product Changes</p>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
