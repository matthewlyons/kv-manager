import React from 'react';

import { Page, Layout } from '@shopify/polaris';

export default function Product_Schedule() {
  return (
    <Page
      full-width
      separator
      title="Products"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/Product'
        }
      ]}
    >
      <Layout>
        <h1>Hello from Product_Schedule</h1>
      </Layout>
    </Page>
  );
}
