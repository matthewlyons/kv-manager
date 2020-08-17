import React from 'react';

import { Page, Layout } from '@shopify/polaris';

export default function School_ViewAll() {
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
        <h1>Hello from School_ViewAll</h1>
      </Layout>
    </Page>
  );
}