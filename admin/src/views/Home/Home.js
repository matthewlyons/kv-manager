import React from 'react';

import { Page, Layout, Card, Banner } from '@shopify/polaris';

export default function Home() {
  return (
    <Page title="Kennedy Violins Manager App" separator>
      <Layout>
        <Layout.Section>
          <Banner
            title="New Teacher Order"
            status="warning"
            action={{ content: 'View Orders', url: '/Teacher/Order' }}
          ></Banner>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card title="Marketing" sectioned primaryFooterAction={{ content: 'View', url: '/Marketing' }}>
            <p>Manage Affiliate Links & Contact Forms</p>
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card title="Products" sectioned primaryFooterAction={{ content: 'View', url: '/Product' }}>
            <p>Manage Products, Collections, & the Customizer</p>
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card title="Rental Program" sectioned primaryFooterAction={{ content: 'View', url: '/Rental' }}>
            <p>Manage Rental Products</p>
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card title="Teachers" sectioned primaryFooterAction={{ content: 'View', url: '/Teacher' }}>
            <p>Manage Schools, Teachers, & View Teacher Orders</p>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
