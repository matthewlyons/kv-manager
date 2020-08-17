import React from 'react';

import { Page, Layout } from '@shopify/polaris';

export default function Marketing_Home() {
  return (
    <Page
      full-width
      title="Marketing"
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
