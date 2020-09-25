import React, { useState, useEffect } from 'react';
import { makeRequest } from '../../util';
import { Page, Layout } from '@shopify/polaris';

export default function Visits_Home() {
  const [appVisits, setAppVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    makeRequest('get', '/old')
      .then((data) => {
        console.log(data);
        setAppVisits(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <Page
      full-width
      title="Products"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/'
        }
      ]}
    >
      <Layout>
        <h1>Hello from Visits_Home</h1>
      </Layout>
    </Page>
  );
}
