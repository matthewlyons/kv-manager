import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Select,
  Card,
  Layout,
  Form,
  FormLayout,
  TextField,
  Page,
  Button
} from '@shopify/polaris';

import { makeRequest } from '../../util';

export default function Marketing_Affiliate_Create() {
  let history = useHistory();

  const [affiliate, setAffiliate] = useState({
    name: '',
    code: '',
    localStorageExp: 7890000,
    percent: 10
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field) => {
    return (value) => {
      if (isNaN(value)) {
        setAffiliate({ ...affiliate, [field]: value });
      } else {
        setAffiliate({ ...affiliate, [field]: Number(value) });
      }
    };
  };

  const handleSubmit = () => {
    setErrors({});
    let errorOBJ = {};
    if (affiliate.name === undefined || affiliate.name === '') {
      errorOBJ.name = 'Required';
    }
    if (affiliate.code === undefined || affiliate.code === '') {
      errorOBJ.code = 'Required';
    }
    if (Object.keys(errorOBJ).length > 0) {
      setErrors(errorOBJ);
    } else {
      makeRequest('POST', '/affiliate', { affiliate })
        .then((data) => {
          history.push(`/Marketing/Affiliate/View/${data._id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const expOptions = [
    { label: '1 Week', value: 604800 },
    { label: '1 Month', value: 2630000 },
    { label: '3 Months', value: 7890000 },
    { label: '6 Months', value: 15780000 },
    { label: '1 Year', value: 31536000 }
  ];

  return (
    <Page
      full-width
      separator
      title="Create New Affiliate"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/Marketing/Affiliate'
        }
      ]}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Form onSubmit={handleSubmit}>
              <FormLayout.Group>
                <TextField
                  label="Name"
                  error={errors.name}
                  value={affiliate.name}
                  onChange={handleInputChange('name')}
                />
                <TextField
                  label="Affiliate Code"
                  error={errors.code}
                  value={affiliate.code}
                  onChange={handleInputChange('code')}
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  label="Affiliate Percent"
                  error={errors.percent}
                  value={affiliate.percent?.toString()}
                  onChange={handleInputChange('percent')}
                  type="number"
                />
                <Select
                  label="Retargeting Window"
                  options={expOptions}
                  error={errors.localStorageExp}
                  value={affiliate.localStorageExp}
                  onChange={handleInputChange('localStorageExp')}
                  helpText="If customer doesn't purchase on first visit."
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
