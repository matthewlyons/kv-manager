import React from 'react';

import { Page, Layout } from '@shopify/polaris';

export default function Product_Config_Form() {
  const submit = () => {};
  return (
    <Page
      full-width
      separator
      title="Create New Product Configuration"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/Product/Config'
        }
      ]}
    >
      <Layout>
        <h1>Hello from Product_Config_Form</h1>
      </Layout>
    </Page>
  );
}
