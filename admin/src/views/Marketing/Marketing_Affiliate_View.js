import React, { useEffect, useState } from 'react';
import _ from 'underscore';
import moment from 'moment';

import {
  Page,
  Layout,
  SkeletonPage,
  Heading,
  Card,
  TextStyle,
  ResourceList
} from '@shopify/polaris';
import { makeRequest } from '../../util';

export default function Marketing_Affiliate_View(props) {
  const [affiliate, setAffiliate] = useState({});
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    makeRequest('GET', `/affiliate/${props.match.params.id}`).then(
      (response) => {
        setAffiliate(response.dbAffiliate);
        setOrders(response.orders);
        setLoading(false);
      }
    );
  }, []);
  return (
    <React.Fragment>
      {loading ? (
        <SkeletonPage primaryAction></SkeletonPage>
      ) : (
        <Page
          full-width
          separator
          title={affiliate.name}
          breadcrumbs={[
            {
              content: 'Back',
              url: '/Marketing/Affiliate'
            }
          ]}
        >
          <Layout>
            <Layout.Section secondary>
              <Heading>Orders</Heading>
            </Layout.Section>
            <Layout.Section>
              <Card>
                <ResourceList
                  resourceName={{ singular: 'customer', plural: 'customers' }}
                  items={orders}
                  renderItem={(item) => {
                    const { orderNumber, totalEarned } = item;
                    return (
                      <ResourceList.Item>
                        <h3>
                          <TextStyle variation="strong">
                            Earned: ${totalEarned}
                          </TextStyle>
                        </h3>
                        <div>Order: {orderNumber}</div>
                      </ResourceList.Item>
                    );
                  }}
                />
              </Card>
            </Layout.Section>
          </Layout>
        </Page>
      )}
    </React.Fragment>
  );
}
