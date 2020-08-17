import React from 'react';

import { Page, Layout } from '@shopify/polaris';

export default function Teacher_View() {
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
        <h1>Hello from Teacher_View</h1>
      </Layout>
    </Page>
  );
}
