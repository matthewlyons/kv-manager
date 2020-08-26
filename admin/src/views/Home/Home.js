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
            action={{ content: 'View Orders', url: '/Teacher/Orders' }}
          ></Banner>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card
            title="Marketing"
            sectioned
            primaryFooterAction={{ content: 'Manage', url: '/Marketing' }}
          >
            <p>Manage Affiliate Links & Contact Forms</p>
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card
            title="Products"
            sectioned
            primaryFooterAction={{ content: 'Manage', url: '/Product' }}
          >
            <p>Manage Products, Collections, & the Customizer</p>
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card
            title="Rental Program"
            sectioned
            primaryFooterAction={{ content: 'Manage', url: '/Rental' }}
          >
            <p>Manage Rental Products</p>
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card
            title="Teacher Loyalty Program"
            sectioned
            primaryFooterAction={{ content: 'Manage', url: '/Teacher' }}
          >
            <p>Manage Schools, Teachers, & View Teacher Orders</p>
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card
            title="Shipping"
            sectioned
            primaryFooterAction={{ content: 'Manage', url: '/Shipping' }}
          >
            <p>Manage Shipping Rates & View Recent Estimates</p>
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card
            title="Image Assets"
            sectioned
            primaryFooterAction={{ content: 'Manage', url: '/Asset' }}
          >
            <p>View and Manage Image Assets</p>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
