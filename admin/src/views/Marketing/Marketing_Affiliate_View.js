import React from 'react';

import { Page, Layout } from '@shopify/polaris';

export default function Marketing_Affiliate_View() {
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
        <h1>Hello from Marketing_Affiliate_View</h1>
      </Layout>
    </Page>
  );
}
