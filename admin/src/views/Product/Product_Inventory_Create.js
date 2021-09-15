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

export default function Product_Inventory_Create(props) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    console.log(props.match.params.id);
  }, []);

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
