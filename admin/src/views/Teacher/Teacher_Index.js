import React from 'react';

import { Page, Layout, Card } from '@shopify/polaris';

export default function Teacher_Index() {
  return (
    <Page
      full-width
      title="Teacher Loyalty Program"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/'
        }
      ]}
    >
      <Layout>
        <Layout.Section oneHalf>
          <Card
            title="Marketing"
            sectioned
            primaryFooterAction={{ content: 'Manage', url: '/Marketing' }}
          >
            <p>Manage Affiliate Links & Contact Forms</p>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
