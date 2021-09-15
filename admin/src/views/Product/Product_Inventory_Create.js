import React, { useState, useEffect } from 'react';

import {
  Page,
  Layout,
  Form,
  FormLayout,
  TextField,
  Button,
  Card,
  TextContainer,
  SkeletonBodyText,
  SkeletonDisplayText
} from '@shopify/polaris';

import useQuery from '../../hooks/useQuery';

import { makeRequest } from '../../util';

export default function Product_Inventory_Create() {
  let id = useQuery().get('id');

  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState('');
  const [follower, setFollower] = useState('');

  useEffect(() => {
    makeRequest('GET', `/shopify-products/product/${id}`).then((data) => {
      setLoading(false);
      setTitle(data.data.title + ' Follower');
    });
  }, [id]);

  const submit = () => {
    setLoading(true);
    setSubmitted(true);
    makeRequest('POST', '/inventory/create', { title, id }).then((response) => {
      setFollower(response.data.id);
      setLoading(false);
    });
  };

  return (
    <Page
      full-width
      title="Cerate New Follower"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/Product'
        }
      ]}
    >
      <Layout>
        <Layout.Section>
          {loading ? (
            <Card sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText />
              </TextContainer>
            </Card>
          ) : (
            <React.Fragment>
              {submitted ? (
                <Card sectioned>
                  <a
                    href={`https://kennedy-violins.myshopify.com/admin/products/${follower}`}
                    target="_blank"
                  >
                    <Button>View Follower</Button>
                  </a>
                  <a
                    href={`https://kennedy-violins.myshopify.com/admin/products/${id}`}
                    target="_blank"
                  >
                    <Button>View Leader</Button>
                  </a>
                </Card>
              ) : (
                <Card sectioned>
                  <Form onSubmit={submit}>
                    <FormLayout.Group>
                      <TextField
                        value={title}
                        onChange={setTitle}
                        label="Product Title"
                        type="text"
                      />
                    </FormLayout.Group>
                    <FormLayout.Group>
                      <Button submit>Submit</Button>
                    </FormLayout.Group>
                  </Form>
                </Card>
              )}
            </React.Fragment>
          )}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
