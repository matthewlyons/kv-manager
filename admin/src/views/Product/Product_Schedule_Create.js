import React, { useEffect, useState } from 'react';

import {
  Page,
  Card,
  ResourceList,
  TextStyle,
  Button,
  SkeletonBodyText,
  Filters,
  ResourceItem,
  Icon,
  TextField
} from '@shopify/polaris';

import { SearchMinor } from '@shopify/polaris-icons';

import { makeRequest } from '../../util';

export default function Product_Schedule_Create() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleKeyPress = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      e.target.blur();
      //Write you validation logic here
    } else {
      setQuery(e);
    }
  };

  const updateText = (e) => {
    console.log(e);
  };

  return (
    <Page
      full-width
      separator
      title="Products"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/Product/Schedule'
        }
      ]}
    >
      {loading ? (
        <Card sectioned>
          <SkeletonBodyText />
        </Card>
      ) : (
        <Card>
          <TextField
            onChange={setQuery}
            label="Tags"
            inputMode="search"
            value={query}
            onClearButtonClick={(e) => {
              console.log('Clear');
              console.log(e);
            }}
            prefix={<Icon source={SearchMinor} color="inkLighter" />}
            placeholder="Search"
          />
        </Card>
      )}
    </Page>
  );
}
