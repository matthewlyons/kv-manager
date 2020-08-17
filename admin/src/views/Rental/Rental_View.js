import React from 'react';

import { Page, Layout } from '@shopify/polaris';

export default function Rental_View() {
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
        <h1>Hello from Rental_View</h1>
      </Layout>
    </Page>
  );
}
