import React from 'react';

import { Page, Layout } from '@shopify/polaris';

export default function Rental_Home() {
  return (
    <Page
      full-width
      title="Rental Products"
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
