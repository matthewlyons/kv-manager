import React from 'react';

import { Page, Layout } from '@shopify/polaris';

export default function Rental_Form() {
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
        <h1>Hello from Rental_Form</h1>
      </Layout>
    </Page>
  );
}
