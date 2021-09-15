import React, { useState, useEffect } from 'react';

import {
  Page,
  Layout,
  Form,
  FormLayout,
  TextField,
  Button,
  Card
} from '@shopify/polaris';

import useQuery from '../../hooks/useQuery';

import { makeRequest } from '../../util';

export default function Product_Inventory_Create() {
  let history = useHistory();
  let id = useQuery().get('id');
  const [title, setTitle] = useState('');

  useEffect(() => {
    console.log(id);
    makeRequest('GET', `/shopify-products/product/:${id}`).then((data) => {
      console.log(data);
    });
  }, [id]);

  const submit = () => {
    console.log('Submitting');
    console.log(title);
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
        </Layout.Section>
      </Layout>
    </Page>
  );
}
