import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import SlideModal from '../../components/SlideModal';

import { makeRequest } from '../../util';
import {
  Page,
  Layout,
  ButtonGroup,
  Button,
  ResourceList,
  TextStyle,
  Card,
  Heading,
  Label,
  Checkbox,
  Form,
  FormLayout,
  TextField,
  Select,
  ResourceItem,
  Avatar
} from '@shopify/polaris';
import { select } from 'underscore';

export default function Product_Customizer_View(props) {
  let { id } = useParams();
  const [group, setGroup] = useState({});

  const [selected, setSelected] = useState({
    tab: null,
    section: null
  });

  const [tabModal, setTabModal] = useState(false);
  const [sectionModal, setSectionModal] = useState(false);
  const [itemModal, setItemModal] = useState(false);
  const [instrumentModal, setInstrumentModal] = useState(false);

  const [tabName, setTabName] = useState('');
  const [sectionName, setSectionName] = useState('');
  const [itemName, setItemName] = useState('');

  const [productList, setProductList] = useState([]);

  const toggleModal = (modal) => {
    switch (modal) {
      case 'tab':
        setTabModal(!tabModal);
        break;
      case 'section':
        setSectionModal(!sectionModal);
        break;
      case 'item':
        setItemModal(!itemModal);
        break;
      case 'instrument':
        setInstrumentModal(!instrumentModal);
        break;
      default:
        break;
    }
  };

  const addTab = (name) => {
    console.log('Adding Tab');
    let updatedTabs = [...group.tabs, { name: name, sections: [] }];
    let updatedGroup = { ...group, tabs: updatedTabs };
    setGroup(updatedGroup);
  };

  const addSection = (index, name) => {
    console.log('Adding Section');
    let updatedTabs = group.tabs.map((tab, i) => {
      if (i == index) {
        let updatedSections = [...tab.sections, { name, products: [] }];
        return { ...tab, sections: updatedSections };
      } else {
        return tab;
      }
    });
    let updatedGroup = { ...group, tabs: updatedTabs };
    setGroup(updatedGroup);
  };

  const itemSearch = (query) => {
    makeRequest('POST', `/shopify-products/product/search`, { query }).then(
      (data) => {
        setProductList(data);
      }
    );
  };

  const addInstrument = (item) => {
    let updatedInstruments = [...group.instruments, item];
    let updatedGroup = { ...group, instruments: updatedInstruments };
    setGroup(updatedGroup);
  };

  const removeInstrument = (instrumentIndex) => {
    console.log('Removing: ' + instrumentIndex);
    let updatedInstruments = group.instruments.filter((_, i) => {
      return i != instrumentIndex;
    });
    let updatedGroup = { ...group, instruments: updatedInstruments };
    setGroup(updatedGroup);
  };

  const addItem = (tabIndex, sectionIndex, item) => {
    let updatedTabs = group.tabs.map((tab, i) => {
      if (i == tabIndex) {
        let updatedSections = tab.sections.map((section, j) => {
          if (j == sectionIndex) {
            let updatedSections = [...section.products, item];
            return { ...section, products: updatedSections };
          } else {
            return section;
          }
        });
        return { ...tab, sections: updatedSections };
      } else {
        return tab;
      }
    });
    let updatedGroup = { ...group, tabs: updatedTabs };
    setGroup(updatedGroup);
  };

  const removeTab = (tab) => {
    let updatedTabs = group.tabs.filter((_, i) => {
      return i !== tab;
    });

    let updatedGroup = { ...group, tabs: updatedTabs };
    setGroup(updatedGroup);
  };

  const removeSection = (tabIndex, section) => {
    let updatedTabs = group.tabs.map((tab, i) => {
      if (i == tabIndex) {
        let updatedSections = tab.sections.filter((_, j) => {
          return j !== section;
        });
        return { ...tab, sections: updatedSections };
      } else {
        return tab;
      }
    });
    let updatedGroup = { ...group, tabs: updatedTabs };
    setGroup(updatedGroup);
  };

  const removeItem = (tabIndex, sectionIndex, itemIndex) => {
    let updatedTabs = group.tabs.map((tab, i) => {
      if (i == tabIndex) {
        let updatedSections = tab.sections.map((section, j) => {
          if (j == sectionIndex) {
            let updatedProducts = section.products.filter((_, k) => {
              return k !== itemIndex;
            });
            return { ...section, products: updatedProducts };
          } else {
            return section;
          }
        });
        return { ...tab, sections: updatedSections };
      } else {
        return tab;
      }
    });
    let updatedGroup = { ...group, tabs: updatedTabs };
    setGroup(updatedGroup);
  };

  const saveGroup = () => {
    let { name, _id } = group;
    console.log(group);
    let instruments = group.instruments.map((x) => {
      return x._id;
    });

    let tabs = group.tabs.map((x) => {
      let updatedSections = x.sections.map((y) => {
        let updatedProducts = y.products.map((z) => {
          return z._id;
        });
        return { name: y.name, products: updatedProducts };
      });
      return { name: x.name, sections: updatedSections };
    });

    let payload = { _id, name, instruments, tabs };
    makeRequest('PUT', `/customizer/single/${id}`, payload)
      .then((data) => {
        console.log('Victory');
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    makeRequest('GET', `/customizer/single/${id}`).then((data) => {
      console.log(data);
      setGroup(data);
    });
  }, [id]);

  return (
    <Page
      full-width
      separator
      title={group.name ? group.name : ''}
      breadcrumbs={[
        {
          content: 'Back',
          url: '/Product/Customizer'
        }
      ]}
      primaryAction={{
        content: 'Save Group',
        onAction: () => {
          saveGroup();
        }
      }}
      secondaryActions={[
        {
          content: 'Delete Group',
          onAction: () => {
            console.log('Hello');
          }
        }
      ]}
    >
      <Layout>
        <React.Fragment>
          <Layout.Section secondary>
            <Heading>Instruments</Heading>
            <Button
              primary
              onClick={() => {
                toggleModal('instrument');
              }}
            >
              Add Instrument
            </Button>
          </Layout.Section>
          {group.instruments?.length > 0 ? (
            <Layout.Section>
              <Card>
                <ResourceList
                  resourceName={{ singular: 'group', plural: 'groups' }}
                  items={group.instruments}
                  renderItem={(item, index) => {
                    let { data, shopifyId } = item;
                    let { title } = data;
                    let shortcutActions = [
                      {
                        content: 'Remove Instrument',
                        onClick: () => {
                          removeInstrument(index);
                        }
                      }
                    ];
                    return (
                      <ResourceList.Item shortcutActions={shortcutActions}>
                        <h3>
                          <TextStyle variation="strong">{title}</TextStyle>
                        </h3>
                      </ResourceList.Item>
                    );
                  }}
                />
              </Card>
            </Layout.Section>
          ) : (
            <Layout.Section></Layout.Section>
          )}
        </React.Fragment>
        <Layout.Section secondary>
          <Heading>Tabs</Heading>
          <Button
            primary
            onClick={() => {
              toggleModal('tab');
            }}
          >
            Add Tab
          </Button>
        </Layout.Section>
        <Layout.Section>
          {group.tabs?.length > 0 && (
            <React.Fragment>
              {group.tabs.map((tab, i) => {
                return (
                  <Card key={i} primaryFooterAction={{ content: 'Delete Tab' }}>
                    <Card.Section
                      title={tab.name}
                      actions={[
                        {
                          content: 'Add Section',
                          onClick: () => {
                            setSelected({ tab: i, section: null });
                            toggleModal('section');
                          }
                        },
                        {
                          content: 'Remove Tab',
                          onClick: () => {
                            removeTab(i);
                          }
                        }
                      ]}
                    ></Card.Section>
                    {tab.sections?.map((section, j) => {
                      return (
                        <Card.Section
                          key={j}
                          title={section.name}
                          actions={[
                            {
                              content: 'Add Item',
                              onClick: () => {
                                setSelected({ tab: i, section: j });
                                toggleModal('item');
                              }
                            },
                            {
                              content: 'Remove Section',
                              onClick: () => {
                                removeSection(i, j);
                              }
                            }
                          ]}
                        >
                          {section.products?.length > 0 && (
                            <ResourceList
                              resourceName={{
                                singular: 'group',
                                plural: 'groups'
                              }}
                              items={section.products}
                              renderItem={(item, k) => {
                                let index = Number(k);
                                let { data, shopifyId } = item;
                                let { title } = data;

                                let shortcutActions = [
                                  {
                                    content: 'Remove Item',
                                    onClick: () => {
                                      removeItem(i, j, index);
                                    }
                                  }
                                ];

                                return (
                                  <ResourceList.Item
                                    shortcutActions={shortcutActions}
                                  >
                                    <h3>
                                      <TextStyle variation="strong">
                                        {title}
                                      </TextStyle>
                                    </h3>
                                  </ResourceList.Item>
                                );
                              }}
                            />
                          )}
                        </Card.Section>
                      );
                    })}
                  </Card>
                );
              })}
            </React.Fragment>
          )}
        </Layout.Section>
      </Layout>
      <SlideModal
        title="Add Tab"
        open={tabModal}
        toggleModal={() => {
          toggleModal('tab');
        }}
      >
        <Form
          onSubmit={() => {
            addTab(tabName);
          }}
        >
          <FormLayout.Group>
            <Label>Default Tab Names</Label>
            <ButtonGroup>
              <Button
                onClick={() => {
                  addTab('Your Outfit');
                }}
              >
                Your Outfit
              </Button>
              <Button
                onClick={() => {
                  addTab('Your Setup');
                }}
              >
                Your Setup
              </Button>
              <Button
                onClick={() => {
                  addTab('Specials');
                }}
              >
                Specials
              </Button>
            </ButtonGroup>
          </FormLayout.Group>
          <FormLayout.Group>
            <TextField
              type="text"
              label="Custom Tab Name"
              value={tabName}
              onChange={setTabName}
            />
          </FormLayout.Group>

          <FormLayout.Group>
            <Button submit>Save</Button>
          </FormLayout.Group>
        </Form>
      </SlideModal>
      <SlideModal
        title="Add Section"
        open={sectionModal}
        toggleModal={() => {
          toggleModal('section');
        }}
      >
        <Form
          onSubmit={() => {
            addSection(selected.tab, sectionName);
          }}
        >
          <FormLayout.Group>
            <Label>Default Section Names</Label>
            <ButtonGroup>
              <Button
                onClick={() => {
                  addSection(selected.tab, 'Case');
                }}
              >
                Case
              </Button>
              <Button
                onClick={() => {
                  addSection(selected.tab, 'Bow');
                }}
              >
                Bow
              </Button>
              <Button
                onClick={() => {
                  addSection(selected.tab, 'Rosin');
                }}
              >
                Rosin
              </Button>
              <Button
                onClick={() => {
                  addSection(selected.tab, 'Strings');
                }}
              >
                Strings
              </Button>
              <Button
                onClick={() => {
                  addSection(selected.tab, 'Shoulder Rest');
                }}
              >
                Shoulder Rest
              </Button>
            </ButtonGroup>
          </FormLayout.Group>
          <FormLayout.Group>
            <TextField
              type="text"
              label="Custom Section Name"
              value={sectionName}
              onChange={setSectionName}
            />
          </FormLayout.Group>

          <FormLayout.Group>
            <Button submit>Save</Button>
          </FormLayout.Group>
        </Form>
      </SlideModal>
      <SlideModal
        title="Add Item"
        open={itemModal}
        toggleModal={() => {
          toggleModal('item');
        }}
      >
        <Form
          onSubmit={() => {
            itemSearch(itemName);
          }}
        >
          <FormLayout.Group>
            <TextField
              type="text"
              label="Item Name"
              value={itemName}
              onChange={setItemName}
            />
          </FormLayout.Group>

          <FormLayout.Group>
            <Button submit>Search</Button>
          </FormLayout.Group>
          {productList.length > 0 && (
            <ResourceList
              resourceName={{ singular: 'product', plural: 'products' }}
              items={productList}
              renderItem={(item, i) => {
                let { data, shopifyId } = item;
                let { title } = data;
                let media = null;
                if (data.image) {
                  media = (
                    <Avatar
                      customer
                      size="medium"
                      name={title}
                      source={data.image.src}
                    />
                  );
                }

                return (
                  <ResourceItem
                    id={shopifyId}
                    media={media}
                    accessibilityLabel={`View details for ${title}`}
                    name={title}
                    onClick={() => {
                      addItem(selected.tab, selected.section, item);
                    }}
                  >
                    <h3>
                      <TextStyle variation="strong">{title}</TextStyle>
                    </h3>
                  </ResourceItem>
                );
              }}
            />
          )}
        </Form>
      </SlideModal>
      <SlideModal
        title="Add Instrument"
        open={instrumentModal}
        toggleModal={() => {
          toggleModal('instrument');
        }}
      >
        <Form
          onSubmit={() => {
            itemSearch(itemName);
          }}
        >
          <FormLayout.Group>
            <TextField
              type="text"
              label="Item Name"
              value={itemName}
              onChange={setItemName}
            />
          </FormLayout.Group>

          <FormLayout.Group>
            <Button submit>Search</Button>
          </FormLayout.Group>
          {productList.length > 0 && (
            <ResourceList
              resourceName={{ singular: 'product', plural: 'products' }}
              items={productList}
              renderItem={(item, i) => {
                let { data, shopifyId } = item;
                let { title } = data;
                let media = null;
                if (data.image) {
                  media = (
                    <Avatar
                      customer
                      size="medium"
                      name={title}
                      source={data.image.src}
                    />
                  );
                }

                return (
                  <ResourceItem
                    id={shopifyId}
                    media={media}
                    accessibilityLabel={`View details for ${title}`}
                    name={title}
                    onClick={() => {
                      addInstrument(item);
                    }}
                  >
                    <h3>
                      <TextStyle variation="strong">{title}</TextStyle>
                    </h3>
                  </ResourceItem>
                );
              }}
            />
          )}
        </Form>
      </SlideModal>
    </Page>
  );
}
