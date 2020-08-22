import React from 'react';

import { Page, Layout } from '@shopify/polaris';

export default function Product_Schedule_Create() {
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
    >
      <Layout>
        <h1>Hello from Product_Schedule_Create</h1>
      </Layout>
    </Page>
  );
}
