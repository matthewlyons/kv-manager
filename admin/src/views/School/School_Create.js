import React from 'react';

import { Page, Layout } from '@shopify/polaris';

export default function School_Create() {
  return (
    <Page
      full-width
      separator
      title="Products"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/Teacher'
        }
      ]}
    >
      <Layout>
        <h1>Hello from School_Create</h1>
      </Layout>
    </Page>
  );
}
