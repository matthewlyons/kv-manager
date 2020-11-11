import React from 'react';

import { Page, Layout } from '@shopify/polaris';

import useQuery from '../../hooks/useQuery';

export default function Product_Schedule_View() {
  let id = useQuery().get('id');
  console.log(id);

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
        <h1>Hello from Product_Schedule_View</h1>
      </Layout>
    </Page>
  );
}
