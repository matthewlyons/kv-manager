import React, { useState, useEffect } from 'react';

import {
  Page,
  Layout,
  ButtonGroup,
  Button,
  ResourceList,
  TextStyle,
  Card,
  DataTable
} from '@shopify/polaris';

import { makeRequest } from '../../util';

export default function Activate() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    makeRequest('get', '/activate')
      .then((response) => {
        let rows = response.map((element) => {
          let {
            firstName,
            lastName,
            orderLocation,
            email,
            phone,
            rating,
            orderNumber,
            type
          } = element;
          return [
            orderLocation,
            type,
            `${firstName} ${lastName}`,
            email,
            phone,
            orderNumber,
            rating
          ];
        });
        setData(rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Page
      full-width
      title="Activate"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/'
        }
      ]}
    >
      <Card>
        <DataTable
          showTotalsInFooter
          columnContentTypes={[
            'text',
            'numeric',
            'numeric',
            'numeric',
            'numeric'
          ]}
          headings={[
            'Location',
            'Type',
            'Name',
            'Email',
            'Phone',
            'Order Number',
            'Rating'
          ]}
          rows={data}
        />
      </Card>
    </Page>
  );
}
