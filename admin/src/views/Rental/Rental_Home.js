import React, { useEffect, useState } from 'react';

import {
  Page,
  Layout,
  Heading,
  Card,
  ResourceList,
  ResourceItem,
  TextStyle
} from '@shopify/polaris';

import { makeRequest } from '../../util';

export default function Rental_Home() {
  const [products, setProducts] = useState({
    violin: [],
    viola: [],
    cello: [],
    bass: []
  });

  useEffect(() => {
    makeRequest('get', '/rental')
      .then((response) => {
        console.log(response);
        let allProducts = response;
        const ViolinProducts = allProducts
          .filter((instrument) => instrument.type === 'Violin')
          .sort((a, b) => (a.price > b.price ? 1 : -1));
        const ViolaProducts = allProducts
          .filter((instrument) => instrument.type === 'Viola')
          .sort((a, b) => (a.price > b.price ? 1 : -1));
        const CelloProducts = allProducts
          .filter((instrument) => instrument.type === 'Cello')
          .sort((a, b) => (a.price > b.price ? 1 : -1));
        const BassProducts = allProducts
          .filter((instrument) => instrument.type === 'Bass')
          .sort((a, b) => (a.price > b.price ? 1 : -1));
        setProducts({
          violin: ViolinProducts,
          viola: ViolaProducts,
          cello: CelloProducts,
          bass: BassProducts
        });
      })
      .catch((err) => {
        console.log(err);
        // TODO error handling
      });
  }, []);

  return (
    <Page
      full-width
      separator
      title="Rental Products"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/'
        }
      ]}
      primaryAction={{
        content: 'Create New Rental Product',
        url: '/Rental/Create'
      }}
    >
      <Layout>
        {/* Violin Products */}
        <Layout.Section secondary>
          <Heading>Violin</Heading>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={{ singular: 'violin', plural: 'violins' }}
              items={products.violin}
              renderItem={(item) => {
                const { name, _id, price } = item;
                const url = '/Rental/View/' + _id;
                return (
                  <ResourceList.Item id={_id} url={url}>
                    <h3>
                      <TextStyle variation="strong">{name}</TextStyle>
                    </h3>
                    <div>${price}</div>
                  </ResourceList.Item>
                );
              }}
            />
          </Card>
        </Layout.Section>
        {/* Viola Products */}
        <Layout.Section secondary>
          <Heading>Viola</Heading>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={{ singular: 'viola', plural: 'violas' }}
              items={products.viola}
              renderItem={(item) => {
                const { name, _id, price } = item;
                const url = '/Rental/Products/View/' + _id;
                return (
                  <ResourceList.Item id={_id} url={url}>
                    <h3>
                      <TextStyle variation="strong">{name}</TextStyle>
                    </h3>
                    <div>${price}</div>
                  </ResourceList.Item>
                );
              }}
            />
          </Card>
        </Layout.Section>
        {/* Cello Products */}
        <Layout.Section secondary>
          <Heading>Cello</Heading>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={{ singular: 'cello', plural: 'cellos' }}
              items={products.cello}
              renderItem={(item) => {
                const { name, _id, price } = item;
                const url = '/Rental/Products/View/' + _id;

                return (
                  <ResourceList.Item id={_id} url={url}>
                    <h3>
                      <TextStyle variation="strong">{name}</TextStyle>
                    </h3>
                    <div>${price}</div>
                  </ResourceList.Item>
                );
              }}
            />
          </Card>
        </Layout.Section>
        {/* Bass Products */}
        <Layout.Section secondary>
          <Heading>Bass</Heading>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={{ singular: 'bass', plural: 'basses' }}
              items={products.bass}
              renderItem={(item) => {
                const { name, _id, price } = item;
                const url = '/Rental/Products/View/' + _id;
                return (
                  <ResourceList.Item id={_id} url={url}>
                    <h3>
                      <TextStyle variation="strong">{name}</TextStyle>
                    </h3>
                    <div>${price}</div>
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
