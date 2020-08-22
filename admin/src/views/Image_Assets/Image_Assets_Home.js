import React from 'react';

import { Page, Layout } from '@shopify/polaris';

export default function Image_Assets_Home() {
  return (
    <Page
      full-width
      title="Image Assets"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/'
        }
      ]}
    >
      <Layout>
        <h1>Hello from Assets_Home</h1>
      </Layout>
    </Page>
  );
}
