import React from 'react';

import { Page, Layout } from '@shopify/polaris';

export default function Shipping_Home() {
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
    >
      <Layout>
        <h1>Hello from Shipping_Home</h1>
      </Layout>
    </Page>
  );
}
