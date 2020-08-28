import React from 'react';

import { Page, Layout } from '@shopify/polaris';

export default function Shipping_Rate() {
  return (
    <Page
      full-width
      title="Shipping Rate"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/Shipping'
        }
      ]}
    >
      <Layout>
        <h1>Hello from Shipping_Rate</h1>
      </Layout>
    </Page>
  );
}
