import React from 'react';

import { Page, Layout } from '@shopify/polaris';

export default function Marketing_Contact() {
  return (
    <Page
      full-width
      separator
      title="Products"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/Marketing'
        }
      ]}
    >
      <Layout>
        <h1>Hello from Marketing_Contact</h1>
      </Layout>
    </Page>
  );
}
