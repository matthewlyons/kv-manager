import React from 'react';

import { Page, Layout } from '@shopify/polaris';

export default function Teacher_Home() {
  return (
    <Page
      full-width
      title="Teachers & Schools"
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
