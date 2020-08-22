import React from 'react';

import { Page, Layout, Card } from '@shopify/polaris';

export default function Marketing_Home() {
  return (
    <Page
      full-width
      separator
      title="Marketing"
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
            title="Affiliate Links"
            sectioned
            primaryFooterAction={{ content: 'Manage', url: '/Marketing/Affiliate' }}
          >
            <p>Manage Affiliates</p>
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card title="Contact Forms" sectioned primaryFooterAction={{ content: 'Manage', url: '/Marketing/Contact' }}>
            <p>Manage Contact Forms and View Submissions</p>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
