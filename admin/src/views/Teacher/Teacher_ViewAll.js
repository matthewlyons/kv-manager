import React, { useEffect, useState } from 'react';

import {
  Page,
  Card,
  ResourceList,
  TextStyle,
  Button,
  SkeletonBodyText,
  Filters,
  ResourceItem
} from '@shopify/polaris';

import { makeRequest } from '../../util';

export default function Teacher_ViewAll() {
  const [teachers, setTeachers] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    makeRequest('get', '/teacher')
      .then((res) => {
        console.log(res);
        let teacherList = res.map((teacher) => {
          const { title, firstName, lastName, _id } = teacher;
          return {
            name: firstName + ' ' + lastName,
            _id,
            title
          };
        });

        setTeachers(teacherList);
        setLoading(false);
      })
      .catch((err) => {
        // TODO error handling
        console.log(err);
        setLoading(false);
      });
  }, []);

  const filterControl = (
    <Filters queryValue={query} onQueryChange={setQuery} filters={[]}></Filters>
  );

  return (
    <Page
      full-width
      separator
      title="All Teachers"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/Teacher'
        }
      ]}
    >
      {loading ? (
        <Card sectioned>
          <SkeletonBodyText />
        </Card>
      ) : (
        <Card>
          <ResourceList
            resourceName={{ singular: 'teacher', plural: 'teachers' }}
            items={teachers}
            filterControl={filterControl}
            renderItem={(item) => {
              const { name, title, _id } = item;
              const teacherName =
                title != 'N/A' && title ? title + ' ' + name : name;
              if (
                query === '' ||
                teacherName.toLowerCase().includes(query.toLowerCase())
              ) {
                const url = '/Teacher/Teachers/View/' + _id;
                return (
                  <ResourceItem
                    url={url}
                    id={_id}
                    accessibilityLabel={`View details for ${name}`}
                  >
                    <h3>
                      <TextStyle variation="strong">{teacherName}</TextStyle>
                    </h3>
                  </ResourceItem>
                );
              }
            }}
          />
        </Card>
      )}
    </Page>
  );
}
