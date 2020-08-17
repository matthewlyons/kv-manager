import React from 'react';

import { Page, Layout } from '@shopify/polaris';

export default function Product_Config() {
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
        <h1>Hello from Product_Config</h1>
      </Layout>
    </Page>
  );
}
