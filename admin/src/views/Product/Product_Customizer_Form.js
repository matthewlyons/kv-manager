import React from 'react';

import { Page, Layout } from '@shopify/polaris';

export default function Product_Customizer_Form() {
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
        <h1>Hello from Product_Customizer_Form</h1>
      </Layout>
    </Page>
  );
}
