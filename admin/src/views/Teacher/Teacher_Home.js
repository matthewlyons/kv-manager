import React, { useState, useEffect } from 'react';

import {
  Page,
  Layout,
  ButtonGroup,
  Button,
  ResourceList,
  TextStyle,
  Card,
  Heading,
  SkeletonBodyText
} from '@shopify/polaris';

import { makeRequest } from '../../util';

export default function Teacher_Home() {
  const [data, setData] = useState({ schools: [], teachers: [], requests: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let errors = [];
      let teacherData, schoolData, requestData;

      let teachers = await makeRequest('get', '/teacher').catch((err) => {
        errors.push(err);
      });
      let schools = await makeRequest('get', '/school').catch((err) => {
        errors.push(err);
      });
      if (teachers.length > 0) {
        teacherData = teachers.filter((teacher) => teacher.pinned === true);
        requestData = teachers.filter((teacher) => teacher.approved !== true);
      }

      if (schools) {
        schoolData = schools.slice(0, 10);
      }
      setLoading(false);
      if (errors.length > 0) {
        // TODO Error handling
        console.log(errors.join(' | '));
      } else {
        setData({
          schools: schoolData,
          teachers: teacherData,
          requests: requestData
        });
      }
    }

    fetchData();
  }, []);

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
          {loading ? (
            <Card sectioned>
              <SkeletonBodyText />
            </Card>
          ) : (
            <Card>
              {data.teachers?.length > 0 && (
                <ResourceList
                  resourceName={{ singular: 'teacher', plural: 'teachers' }}
                  items={data.teachers}
                  renderItem={(item) => {
                    const { firstName, lastName, title, _id, schools } = item;
                    let schoolArray = schools.map((school) => {
                      return school.name;
                    });
                    const name =
                      title !== 'N/A'
                        ? title + ' ' + firstName + ' ' + lastName
                        : firstName + ' ' + lastName;
                    const url = '/Teacher/Teachers/View/' + _id;

                    return (
                      <ResourceList.Item
                        url={url}
                        id={_id}
                        accessibilityLabel={`View details for ${name}`}
                      >
                        <h3>
                          <TextStyle variation="strong">{name}</TextStyle>
                        </h3>
                        <div>Schools: {schoolArray.join(', ')}</div>
                      </ResourceList.Item>
                    );
                  }}
                />
              )}
            </Card>
          )}
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
          {loading ? (
            <Card sectioned>
              <SkeletonBodyText />
            </Card>
          ) : (
            <Card>
              {data.schools?.length > 0 && (
                <ResourceList
                  resourceName={{ singular: 'customer', plural: 'customers' }}
                  items={data.schools}
                  renderItem={(item) => {
                    const { name, city, state } = item;
                    const id = item._id;
                    const location = city + ', ' + state;
                    const url = '/Teacher/Schools/View/' + id;

                    return (
                      <ResourceList.Item
                        actions={[{ content: 'Add variant' }]}
                        id={id}
                        url={url}
                      >
                        <h3>
                          <TextStyle variation="strong">{name}</TextStyle>
                        </h3>
                        <div>{location}</div>
                      </ResourceList.Item>
                    );
                  }}
                />
              )}
            </Card>
          )}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
