import React, { useState, useEffect } from 'react';

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

export default function School_ViewAll() {
  const [schools, setSchools] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    makeRequest('get', '/school')
      .then((res) => {
        console.log(res);
        setSchools(res);
        setLoading(false);
      })
      .catch((err) => {
        // TODO error handling
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log(query);
  }, [query]);

  const filterControl = (
    <Filters queryValue={query} onQueryChange={setQuery} filters={[]}></Filters>
  );

  return (
    <Page
      full-width
      separator
      title="All Schools"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/Teacher'
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
            resourceName={{ singular: 'teacher', plural: 'schools' }}
            items={schools}
            filterControl={filterControl}
            renderItem={(item) => {
              if (
                query === '' ||
                item.name.toLowerCase().includes(query.toLowerCase())
              ) {
                const { name, _id } = item;
                const url = '/Teacher/Schools/View/' + _id;

                return (
                  <ResourceItem
                    url={url}
                    id={_id}
                    accessibilityLabel={`View details for ${name}`}
                  >
                    <h3>
                      <TextStyle variation="strong">{name}</TextStyle>
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
