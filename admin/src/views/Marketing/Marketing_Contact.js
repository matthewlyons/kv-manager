import React from 'react';

import { Page, Layout } from '@shopify/polaris';

export default function Marketing_Contact() {
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
        <h1>Hello from Marketing_Contact</h1>
      </Layout>
    </Page>
  );
}
