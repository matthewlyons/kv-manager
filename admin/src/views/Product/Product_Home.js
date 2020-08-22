import React from 'react';

import { Page, Layout, Card } from '@shopify/polaris';

export default function Product_Home() {
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
        content: 'Create New Product',
        url: '/Product/Create'
      }}
    >
      <Layout>
        <Layout.Section oneHalf>
          <Card title="Products" sectioned primaryFooterAction={{ content: 'Manage', url: '/Product/Search' }}>
            <p>Manage Store Products</p>
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card title="Configurations" sectioned primaryFooterAction={{ content: 'Manage', url: '/Product/Config' }}>
            <p>Manage Product Configurations</p>
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card title="Customizer" sectioned primaryFooterAction={{ content: 'Manage', url: '/Product/Customizer' }}>
            <p>Manage Product Customizer</p>
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card title="Schedule" sectioned primaryFooterAction={{ content: 'Manage', url: '/Product/Schedule' }}>
            <p>Schedule Product Changes</p>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
