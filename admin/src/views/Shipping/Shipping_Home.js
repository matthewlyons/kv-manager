import React, { useState, useEffect } from 'react';

import { makeRequest } from '../../util';
import Shipping_Estimates from './components/Shipping_Estimates';
import Shipping_Single_Estimate from './components/Shipping_Single_Estimate';

import {
  Page,
  Layout,
  Card,
  Heading,
  SkeletonBodyText
} from '@shopify/polaris';

export default function Shipping_Home() {
  const [shippingRates, setShippingRates] = useState([]);
  const [rate, setRate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    makeRequest('get', '/shipping/quotes')
      .then((data) => {
        console.log(data);
        setShippingRates(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const selectRate = (rate) => {
    setRate(Number(rate));
  };
  const deselectRate = () => {
    setRate(false);
  };

  const refreshRates = () => {
    console.log('Getting Rates');
  };

  const nextRate = () => {
    if (rate === shippingRates.length - 1) {
      setRate(0);
    } else {
      setRate(rate + 1);
    }
  };
  const prevRate = () => {
    if (rate === 0) {
      setRate(shippingRates.length - 1);
    } else {
      setRate(rate - 1);
    }
  };

  return (
    <React.Fragment>
      {loading ? (
        <Page
          full-width
          separator
          title="Shipping"
          breadcrumbs={[
            {
              content: 'Back',
              url: '/'
            }
          ]}
          primaryAction={{
            content: 'View Carrier Services',
            url: '/Shipping/Services'
          }}
        >
          <Layout>
            <Layout.Section secondary>
              <Heading>Shipping Rates</Heading>
            </Layout.Section>
            <Layout.Section>
              <Card sectioned>
                <SkeletonBodyText />
              </Card>
            </Layout.Section>
          </Layout>
        </Page>
      ) : (
        <React.Fragment>
          {rate === false ? (
            <Shipping_Estimates
              shippingRates={shippingRates}
              selectRate={selectRate}
            />
          ) : (
            <Shipping_Single_Estimate
              rate={shippingRates[rate]}
              deselectRate={deselectRate}
              nextRate={nextRate}
              prevRate={prevRate}
            />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
