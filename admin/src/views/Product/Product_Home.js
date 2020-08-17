import React from 'react';

import { Page, Layout } from '@shopify/polaris';

export default function Product_Home() {
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
      <Layout></Layout>
    </Page>
  );
}