import React, { useEffect, useState } from 'react';

import { Page, Layout, ResourceList, TextStyle, Card } from '@shopify/polaris';

import { makeRequest } from '../../util';

export default function Shipping_Services() {
  let [services, setServices] = useState([]);

  useEffect(() => {
    makeRequest('get', '/shipping/services').then((data) => {
      setServices(data);
    });
  }, []);

  const deleteService = (id) => {
    makeRequest('delete', '/shipping/services', { service: id }).then(
      (data) => {
        console.log(data);
      }
    );
  };
  const createService = () => {
    makeRequest('post', '/shipping/services').then((data) => {
      console.log(data);
    });
  };
  return (
    <Page
      full-width
      separator
      title="Carrier Services"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/Shipping'
        }
      ]}
      primaryAction={{
        content: 'Add Carrier Service',
        onAction: () => {
          createService();
        }
      }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={{ singular: 'service', plural: 'services' }}
              items={services}
              renderItem={(item) => {
                const shortcutActions = [
                  {
                    content: 'Remove',
                    onClick: () => {
                      deleteService(item.id);
                    }
                  }
                ];

                const { id, name } = item;
                const url = '/Shipping/Rate/' + id;

                return (
                  <ResourceList.Item
                    url={url}
                    id={id}
                    accessibilityLabel={`View details for ${name}`}
                    shortcutActions={shortcutActions}
                  >
                    <h3>
                      <TextStyle variation="strong">{name}</TextStyle>
                    </h3>
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
