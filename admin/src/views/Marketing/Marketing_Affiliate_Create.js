import React from 'react';

import { Page, Layout } from '@shopify/polaris';

export default function Marketing_Affiliate_Create() {
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
        <h1>Hello from Marketing_Affiliate_Create</h1>
      </Layout>
    </Page>
  );
}
