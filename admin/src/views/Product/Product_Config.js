import React, { useEffect, useState } from 'react';

import {
  Page,
  Card,
  ResourceList,
  TextStyle,
  Button,
  SkeletonBodyText,
  Filters,
  ResourceItem
} from '@shopify/polaris';

import { makeRequest } from '../../util';

export default function Product_Config() {
  const [configs, setConfigs] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    makeRequest('get', '/product')
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        // TODO error handling
        console.log(err);
        setLoading(false);
      });
  }, []);

  const filterControl = (
    <Filters queryValue={query} onQueryChange={setQuery} filters={[]}></Filters>
  );

  return (
    <Page
      full-width
      separator
      title="Product Configurations"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/Product'
        }
      ]}
      primaryAction={{ content: 'Create', url: '/Product/Config/Create' }}
    >
      {loading ? (
        <Card sectioned>
          <SkeletonBodyText />
        </Card>
      ) : (
        <Card>
          <ResourceList
            resourceName={{
              singular: 'configuration',
              plural: 'product configurations'
            }}
            items={configs}
            filterControl={filterControl}
            renderItem={(item) => {
              let { _id, url, title } = item;
              if (
                query === '' ||
                title.toLowerCase().includes(query.toLowerCase())
              ) {
                return (
                  <ResourceItem
                    url={url}
                    id={_id}
                    accessibilityLabel={`View details for ${title}`}
                  >
                    <h3>
                      <TextStyle variation="strong">{title}</TextStyle>
                    </h3>
                  </ResourceItem>
                );
              }
            }}
          />
        </Card>
      )}
    </Page>
  );
}
