import React from 'react';

import { Page, Layout } from '@shopify/polaris';

export default function Product_Config() {
  return (
    <Page
      full-width
      separator
      title="Product Configurations"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/Product'
        }
      ]}
    >
      <Layout>
        <h1>Hello from Product_Config</h1>
      </Layout>
    </Page>
  );
}
