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

export default function Product_Search() {
  const [products, setProducts] = useState([]);
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
      title="Products"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/Product'
        }
      ]}
    >
      {loading ? (
        <Card sectioned>
          <SkeletonBodyText />
        </Card>
      ) : (
        <Card>
          <ResourceList
            resourceName={{ singular: 'product', plural: 'products' }}
            items={products}
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
