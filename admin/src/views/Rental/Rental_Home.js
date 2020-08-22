import React from 'react';

import { Page, Layout } from '@shopify/polaris';

export default function Rental_Home() {
  return (
    <Page
      full-width
      separator
      title="Rental Products"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/'
        }
      ]}
      primaryAction={{
        content: 'Create New Rental Product',
        url: '/Rental/Create'
      }}
    >
      <Layout></Layout>
    </Page>
  );
}
