import React, { useEffect, useState } from 'react';

import { Page, Layout } from '@shopify/polaris';
import { makeRequest } from '../../util';

export default function Marketing_Affiliate_View() {
  const [affiliate, setAffiliate] = useState({});
  useEffect(() => {
    makeRequest('GET', '/affiliate').then((data) => {
      setAffiliate(data);
    });
  }, []);
  return (
    <Page
      full-width
      separator
      title="Products"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/Marketing/Affiliate'
        }
      ]}
    >
      <Layout>
        <h1>Hello from Marketing_Affiliate_View</h1>
      </Layout>
    </Page>
  );
}
