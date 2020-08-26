import React, { useState, useEffect } from 'react';

import { Page, Layout, ResourceList, TextStyle, Card } from '@shopify/polaris';

import { makeRequest } from '../../util';

export default function Marketing_Affiliate() {
  const [data, setData] = useState([]);

  useEffect(() => {
    makeRequest('GET', '/affiliate').then((data) => {
      setData(data);
    });
  }, []);

  return (
    <Page
      full-width
      separator
      title="Affiliates"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/Marketing'
        }
      ]}
      primaryAction={{
        content: 'Create New Affiliate',
        url: '/Marketing/Affiliate/Create'
      }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={{ singular: 'affiliate', plural: 'affiliates' }}
              items={data}
              renderItem={(item) => {
                const { _id, name, code } = item;
                const url = '/Marketing/Affiliate/View/' + _id;

                return (
                  <ResourceList.Item
                    url={url}
                    id={_id}
                    accessibilityLabel={`View details for ${name}`}
                  >
                    <h3>
                      <TextStyle variation="strong">{name}</TextStyle>
                    </h3>
                    <div>Affiliate Code: {code}</div>
                  </ResourceList.Item>
                );
              }}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
