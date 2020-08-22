import React, { useState } from 'react';

import { Page, Layout, ButtonGroup, Button, ResourceList, TextStyle, Card, Heading } from '@shopify/polaris';

export default function Teacher_Home() {
  const [data, setData] = useState({ schools: [], teachers: [], requests: [] });
  return (
    <Page
      full-width
      separator
      title="Teacher Loyalty Program"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/'
        }
      ]}
    >
      <Layout>
        <Layout.Section secondary>
          <Heading>Teachers</Heading>
          <ButtonGroup>
            <Button url="/Teacher/Teachers" primary>
              View All
            </Button>
            <Button url="/Teacher/Teachers/Create">Add New</Button>
          </ButtonGroup>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={{ singular: 'teacher', plural: 'teachers' }}
              items={data.teachers}
              renderItem={(item) => {
                const { firstName, lastName, title, _id } = item;
                const name = title !== 'N/A' ? title + ' ' + firstName + ' ' + lastName : firstName + ' ' + lastName;
                const url = '/Teachers/Teacher/View/' + _id;

                return (
                  <ResourceList.Item url={url} id={_id} accessibilityLabel={`View details for ${name}`}>
                    <h3>
                      <TextStyle variation="strong">{name}</TextStyle>
                    </h3>
                  </ResourceList.Item>
                );
              }}
            />
          </Card>
        </Layout.Section>
        {/* School List */}
        <Layout.Section secondary>
          <Heading>Schools</Heading>
          <ButtonGroup>
            <Button url="/Teacher/Schools" primary>
              View All
            </Button>
            <Button url="/Teacher/Schools/Create">Add New</Button>
          </ButtonGroup>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={{ singular: 'customer', plural: 'customers' }}
              items={data.schools}
              renderItem={(item) => {
                const { name, city, state } = item;
                const id = item._id;
                const location = city + ', ' + state;
                const url = '/Teacher/School/View/' + id;

                return (
                  <ResourceList.Item actions={[{ content: 'Add variant' }]} id={id} url={url}>
                    <h3>
                      <TextStyle variation="strong">{name}</TextStyle>
                    </h3>
                    <div>{location}</div>
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
