import React from 'react';

import { Page, Layout } from '@shopify/polaris';

export default function Product_Schedule() {
  return (
    <Page
      full-width
      title="Products"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/'
        }
      ]}
    >
      <Layout>
        <h1>Hello from Product_Schedule</h1>
      </Layout>
    </Page>
  );
}
