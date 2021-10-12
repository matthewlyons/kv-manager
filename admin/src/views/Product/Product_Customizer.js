import React, { useState, useEffect } from 'react';

import { makeRequest } from '../../util';

import { useHistory } from 'react-router-dom';

import {
  Page,
  Layout,
  ButtonGroup,
  Button,
  ResourceList,
  TextStyle,
  Card,
  Heading,
  SkeletonBodyText,
  Form,
  FormLayout,
  TextField
} from '@shopify/polaris';

import SlideModal from '../../components/SlideModal';

export default function Product_Customizer() {
  let history = useHistory();

  const [groups, setGroups] = useState([]);

  const [createModal, setCreateModal] = useState(false);
  const [name, setName] = useState('');

  const toggleModal = (modal) => {
    switch (modal) {
      case 'create':
        setCreateModal(!createModal);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    makeRequest('GET', `/customizer`).then((data) => {
      setGroups(data);
    });
  }, []);

  const createGroup = (x) => {
    console.log(x);
    makeRequest('POST', `/customizer`, { name: x }).then((data) => {
      history.push(`/Product/Customizer/View/${data._id}`);
    });
  };

  return (
    <Page
      full-width
      separator
      title="Customizer Groups"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/Product'
        }
      ]}
      primaryAction={{
        content: 'New Group',
        onAction: () => {
          toggleModal('create');
        }
      }}
    >
      <Layout>
        {groups.length > 0 && (
          <React.Fragment>
            <Layout.Section secondary>
              <Heading>Customizer Groups</Heading>
            </Layout.Section>
            <Layout.Section>
              <Card>
                <ResourceList
                  resourceName={{ singular: 'group', plural: 'groups' }}
                  items={groups}
                  renderItem={(item) => {
                    let url = '/Product/Customizer/View/' + item._id;
                    let { name } = item;
                    return (
                      <ResourceList.Item url={url}>
                        <h3>
                          <TextStyle variation="strong">{name}</TextStyle>
                        </h3>
                      </ResourceList.Item>
                    );
                  }}
                />
              </Card>
            </Layout.Section>
          </React.Fragment>
        )}
      </Layout>
      <SlideModal
        title="Create Customizer Group"
        open={createModal}
        toggleModal={() => {
          toggleModal('create');
        }}
      >
        <Form
          onSubmit={() => {
            createGroup(name);
          }}
        >
          <FormLayout.Group>
            <TextField
              type="text"
              label="Name"
              value={name}
              onChange={setName}
            />
          </FormLayout.Group>

          <FormLayout.Group>
            <Button submit>Save</Button>
          </FormLayout.Group>
        </Form>
      </SlideModal>
    </Page>
  );
}
