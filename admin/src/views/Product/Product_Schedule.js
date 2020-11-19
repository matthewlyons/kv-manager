import React, { useEffect, useState } from 'react';

import moment from 'moment';

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

export default function Product_Schedule() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [activeEvents, setActiveEvents] = useState([]);
  const [archiveEvents, setArchiveEvents] = useState([]);

  useEffect(() => {
    makeRequest('GET', `/product/event`).then((data) => {
      let currentDate = Date.now();
      console.log(currentDate);
      let upcoming = data.filter(
        (e) => new Date(e.start).getTime() > currentDate && e.active === false
      );
      let active = data.filter((e) => e.active === true);
      let archive = data.filter(
        (e) => new Date(e.end).getTime() < currentDate && e.active === false
      );
      setUpcomingEvents(upcoming);
      setActiveEvents(active);
      setArchiveEvents(archive);
    });
  }, []);

  return (
    <Page
      full-width
      separator
      title="Product Events"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/Product'
        }
      ]}
    >
      <Layout>
        {upcomingEvents.length > 0 && (
          <React.Fragment>
            <Layout.Section secondary>
              <Heading>Upcoming Events</Heading>
            </Layout.Section>
            <Layout.Section>
              <Card>
                <ResourceList
                  resourceName={{ singular: 'customer', plural: 'customers' }}
                  items={upcomingEvents}
                  renderItem={(item) => {
                    let startDate = moment(item.start).format('MM/DD/YYYY');
                    let endDate = moment(item.end).format('MM/DD/YYYY');
                    let url = '/Product/Schedule/Event/' + item._id;
                    return (
                      <ResourceList.Item url={url}>
                        <h3>
                          <TextStyle variation="strong">
                            {item.current.admin.title}
                          </TextStyle>
                        </h3>
                        <div>
                          {startDate} - {endDate}
                        </div>
                      </ResourceList.Item>
                    );
                  }}
                />
              </Card>
            </Layout.Section>
          </React.Fragment>
        )}

        {activeEvents.length > 0 && (
          <React.Fragment>
            <Layout.Section secondary>
              <Heading>Active Events</Heading>
            </Layout.Section>
            <Layout.Section>
              <Card>
                <ResourceList
                  resourceName={{ singular: 'customer', plural: 'customers' }}
                  items={activeEvents}
                  renderItem={(item) => {
                    let startDate = moment(item.start).format('MM/DD/YYYY');
                    let endDate = moment(item.end).format('MM/DD/YYYY');
                    let url = '/Product/Schedule/Event/' + item._id;
                    return (
                      <ResourceList.Item url={url}>
                        <h3>
                          <TextStyle variation="strong">
                            {item.current.admin.title}
                          </TextStyle>
                        </h3>
                        <div>
                          {startDate} - {endDate}
                        </div>
                      </ResourceList.Item>
                    );
                  }}
                />
              </Card>
            </Layout.Section>
          </React.Fragment>
        )}

        {archiveEvents.length > 0 && (
          <React.Fragment>
            <Layout.Section secondary>
              <Heading>Archive Events</Heading>
            </Layout.Section>
            <Layout.Section>
              <Card>
                <ResourceList
                  resourceName={{ singular: 'customer', plural: 'customers' }}
                  items={archiveEvents}
                  renderItem={(item) => {
                    let startDate = moment(item.start).format('MM/DD/YYYY');
                    let endDate = moment(item.end).format('MM/DD/YYYY');
                    let url = '/Product/Schedule/Event/' + item._id;
                    return (
                      <ResourceList.Item url={url}>
                        <h3>
                          <TextStyle variation="strong">
                            {item.current.admin.title}
                          </TextStyle>
                        </h3>
                        <div>
                          {startDate} - {endDate}
                        </div>
                      </ResourceList.Item>
                    );
                  }}
                />
              </Card>
            </Layout.Section>
          </React.Fragment>
        )}
      </Layout>
    </Page>
  );
}
