import React, { useState, useEffect } from 'react';

import {
  Page,
  Layout,
  Card,
  ResourceList,
  TextStyle,
  Thumbnail
} from '@shopify/polaris';

import { makeRequest } from '../../util';

export default function Teacher_Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    makeRequest('get', '/teacher-store/products')
      .then((response) => {
        response.sort((a, b) => a.points - b.points);
        setProducts(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Page
      full-width
      title="Teacher Loyalty Reward Products"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/Teacher'
        }
      ]}
      primaryAction={{
        content: 'Add New',
        url: '/Teacher/Products/Create'
      }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            {products?.length > 0 && (
              <ResourceList
                resourceName={{ singular: 'teacher', plural: 'teachers' }}
                items={products}
                renderItem={(item) => {
                  let { _id, title, image, description, points } = item;
                  let url = `/Teacher/Products/View/${_id}`;
                  let media = (
                    <Thumbnail source={image.url} alt={title} size="large" />
                  );
                  let productDescription =
                    description.length > 200
                      ? description.substring(0, 200) + '...'
                      : description;
                  return (
                    <ResourceList.Item
                      url={url}
                      id={_id}
                      accessibilityLabel={`View details for ${title}`}
                      media={media}
                    >
                      <h3>
                        <TextStyle variation="strong">{title}</TextStyle>
                      </h3>
                      <div>
                        {points} Points | {productDescription}
                      </div>
                    </ResourceList.Item>
                  );
                }}
              />
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
