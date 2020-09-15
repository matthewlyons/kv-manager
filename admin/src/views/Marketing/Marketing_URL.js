import React, { useState, useEffect } from 'react';

import {
  Page,
  Layout,
  SkeletonBodyText,
  Card,
  ResourceList,
  TextStyle
} from '@shopify/polaris';

import { makeRequest } from '../../util';

export default function Marketing_URL() {
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState([]);
  const [redirects, setRedirects] = useState([]);

  useEffect(() => {
    makeRequest('GET', '/shopify/pages').then((data) => {
      setPages(data);
      setLoading(false);
    });
    makeRequest('GET', '/shopify/redirects').then((data) => {
      setRedirects(data);
    });
  }, []);

  const removeRedirect = (redirect, i) => {
    makeRequest('DELETE', `/shopify/redirects/${redirect.id}`).then((data) => {
      let updatedRedirects = [...redirects];
      updatedRedirects.splice(i, 1);
      setRedirects(updatedRedirects);
    });
  };

  const addRedirect = (page) => {
    let redirect = {
      redirect: {
        path: `/${page.handle}`,
        target: `/pages/${page.handle}`
      }
    };
    makeRequest('POST', '/shopify/redirects', redirect).then((data) => {
      setRedirects([...redirects, data.redirect]);
    });
  };

  return (
    <Page
      full-width
      title="Page URLs"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/Marketing'
        }
      ]}
    >
      <Layout>
        <Layout.Section>
          {loading ? (
            <Card sectioned>
              <SkeletonBodyText />
            </Card>
          ) : (
            <Card>
              <ResourceList
                resourceName={{ singular: 'teacher', plural: 'teachers' }}
                items={pages}
                renderItem={(item, _, i) => {
                  let redirect = redirects.filter(
                    (e) => e.target === `/pages/${item.handle}`
                  )[0];

                  let { title } = item;

                  let shortcutActions = [];

                  if (redirect) {
                    shortcutActions.push({
                      content: 'Remove URL',
                      onClick: () => {
                        removeRedirect(redirect, i);
                      }
                    });
                  } else {
                    shortcutActions.push({
                      content: 'Shorten URL',
                      onClick: () => {
                        addRedirect(item);
                      }
                    });
                  }

                  return (
                    <ResourceList.Item shortcutActions={shortcutActions}>
                      <h3>
                        <TextStyle variation="strong">{title}</TextStyle>
                      </h3>
                      {redirect?.path && <h3>Redirect: {redirect?.path}</h3>}
                    </ResourceList.Item>
                  );
                }}
              />
            </Card>
          )}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
