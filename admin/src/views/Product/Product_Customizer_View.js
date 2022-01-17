import React, { useState, useEffect, useContext } from 'react';

import { useParams, useHistory } from 'react-router-dom';

import SlideModal from '../../components/SlideModal';

import { StoreContext } from '../../context/StoreContext';

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

import AreYouSure from '../../components/AreYouSure';
import Loading from '../../components/Loading';
import AvaliabilityTable from './components/AvaliabilityTable';

export default function Product_Customizer_View(props) {
  let history = useHistory();

  const { state, setError } = useContext(StoreContext);
  let { id } = useParams();
  const [group, setGroup] = useState({});

  const [selected, setSelected] = useState({
    tab: null,
    section: null
  });

  const [loading, setLoading] = useState(false);

  const [tabModal, setTabModal] = useState(false);
  const [sectionModal, setSectionModal] = useState(false);
  const [itemModal, setItemModal] = useState(false);
  const [instrumentModal, setInstrumentModal] = useState(false);
  const [editGroupModal, setEditGroupModal] = useState(false);
  const [deleteGroupModal, setDeleteGroupModal] = useState(false);
  const [availabilityModal, setAvailabilityModal] = useState(false);
  const [availability, setAvailability] = useState([]);
  const [instrumentSizes, setInstrumentSizes] = useState([]);

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
      case 'edit':
        setEditGroupModal(!editGroupModal);
        break;
      case 'delete':
        setDeleteGroupModal(!deleteGroupModal);
        break;
      case 'availability':
        setAvailabilityModal(!availabilityModal);
        break;
      default:
        break;
    }
  };

  const deleteGroup = () => {
    console.log('Sending delete Request');
    makeRequest('DELETE', `/customizer/single/${id}`)
      .then((data) => {
        history.goBack();
      })
      .catch((err) => {
        alert('There Was An Error Deleting Group');
      });
  };

  const addTab = (name) => {
    let updatedTabs = [...group.tabs, { name: name, sections: [] }];
    let updatedGroup = { ...group, tabs: updatedTabs };
    setGroup(updatedGroup);
  };

  const addSection = (index, name) => {
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
    setLoading(true);
    makeRequest('POST', `/shopify-products/product/search`, { query }).then(
      (data) => {
        console.log(data);
        setLoading(false);
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
    setLoading(true);
    let { name, _id } = group;
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
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);

        setError(err);
      });
  };

  const changeTabName = (tabIndex, name) => {
    let updatedTabs = group.tabs.map((tab, i) => {
      if (i == tabIndex) {
        return { ...tab, name };
      } else {
        return tab;
      }
    });
    setGroup({ ...group, tabs: updatedTabs });
  };

  const changeSectionName = (tabIndex, sectionIndex, name) => {
    let updatedTabs = group.tabs.map((tab, i) => {
      if (i == tabIndex) {
        let updatedSections = tab.sections.map((section, j) => {
          if (j == sectionIndex) {
            return { ...section, name };
          } else {
            return section;
          }
        });
        return { ...tab, sections: updatedSections };
      } else {
        return tab;
      }
    });
    setGroup({ ...group, tabs: updatedTabs });
  };

  Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
  };

  const movePosition = (type, direction, tab, section, item) => {
    let old, updated;
    if (type === 'tab') {
      // Move Tab
      old = tab;
      updated = direction === 'up' ? old - 1 : old + 1;
      if (updated < 0 || updated >= group.tabs.length) {
        return;
      } else {
        let updatedTabs = [...group.tabs];
        updatedTabs.move(old, updated);

        let updatedGroup = { ...group, tabs: updatedTabs };
        setGroup(updatedGroup);
      }
    } else if (type === 'section') {
      // Move Section

      old = section;
      updated = direction === 'up' ? old - 1 : old + 1;

      if (updated < 0 || updated >= group.tabs[tab].sections.length) {
        return;
      } else {
        let updatedTabs = group.tabs.map((x, i) => {
          if (i == tab) {
            let updatedSections = [...x.sections];
            updatedSections.move(old, updated);
            return { ...x, sections: updatedSections };
          } else {
            return x;
          }
        });
        let updatedGroup = { ...group, tabs: updatedTabs };
        setGroup(updatedGroup);
      }
    } else if (type === 'item') {
      // Move Item
      old = item;
      updated = direction === 'up' ? old - 1 : old + 1;
      if (
        updated < 0 ||
        updated >= group.tabs[tab].sections[section].products.length
      ) {
        return;
      } else {
        let updatedTabs = [...group.tabs];
        updatedTabs.move(old, updated);

        let updatedGroup = { ...group, tabs: updatedTabs };
        setGroup(updatedGroup);
      }
    }
  };

  const editAvailability = (i, j) => {
    console.log(i, j);
    toggleModal('availability');
  };

  useEffect(() => {
    makeRequest('GET', `/customizer/single/${id}`).then((data) => {
      setGroup(data);
      let instrumentData = [];
      data.instruments.forEach((x) => {
        let sizes = x.data.options.filter((e) => e.name == 'Size')[0].values;
        instrumentData.push(...sizes);
      });
      let finalArray = Array.from(new Set(instrumentData));
      setInstrumentSizes(finalArray);
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
            toggleModal('delete');
          }
        },
        {
          content: 'Edit Group',
          onAction: () => {
            toggleModal('edit');
          }
        },
        {
          content: 'View Customizer',
          onAction: () => {
            let firstVariant = group.instruments[0].data.variants[0].id;
            if (firstVariant) {
              window.open(
                'https://kennedyviolins.com/community/application/Customizer/' +
                  firstVariant,
                '_blank'
              );
            }
          }
        }
      ]}
    >
      {loading && <Loading />}
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
                let actions = [
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
                ];

                if (i < group.tabs.length - 1) {
                  actions.unshift({
                    content: 'Move Down',
                    onClick: () => {
                      movePosition('tab', 'down', i);
                    }
                  });
                }

                if (i > 0) {
                  actions.unshift({
                    content: 'Move Up',
                    onClick: () => {
                      movePosition('tab', 'up', i);
                    }
                  });
                }

                return (
                  <Card key={i}>
                    <Card.Section
                      title={tab.name}
                      actions={actions}
                    ></Card.Section>
                    {tab.sections?.map((section, j) => {
                      let actions = [
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
                        },
                        {
                          content: 'Edit Availability',
                          onClick: () => {
                            editAvailability(i, j);
                          }
                        }
                      ];

                      if (j < tab.sections.length - 1) {
                        actions.unshift({
                          content: 'Move Down',
                          onClick: () => {
                            movePosition('section', 'down', i, j);
                          }
                        });
                      }

                      if (j > 0) {
                        actions.unshift({
                          content: 'Move Up',
                          onClick: () => {
                            movePosition('section', 'up', i, j);
                          }
                        });
                      }

                      return (
                        <Card.Section
                          key={j}
                          title={section.name}
                          actions={actions}
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
                  addSection(selected.tab, 'Staff Picks');
                }}
              >
                Staff Picks
              </Button>
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
                  addSection(selected.tab, 'Strings');
                }}
              >
                Strings
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
                let { title, variants } = data;
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
                    <p>${variants[0]?.price}</p>
                  </ResourceItem>
                );
              }}
            />
          )}
        </Form>
      </SlideModal>
      <SlideModal
        title="Edit Group"
        open={editGroupModal}
        toggleModal={() => {
          toggleModal('edit');
        }}
      >
        <Form>
          <FormLayout.Group>
            <TextField
              type="text"
              label="Group Name"
              value={group.name}
              onChange={(e) => {
                setGroup({ ...group, name: e });
              }}
            />
          </FormLayout.Group>
          {group.tabs?.length > 0 && (
            <React.Fragment>
              {group.tabs.map((tab, tabIndex) => {
                return (
                  <React.Fragment key={tabIndex}>
                    <FormLayout.Group>
                      <TextField
                        type="text"
                        label="Tab Name"
                        value={tab.name}
                        onChange={(e) => {
                          changeTabName(tabIndex, e);
                        }}
                      />
                    </FormLayout.Group>
                    {tab?.sections?.map((section, sectionIndex) => {
                      return (
                        <FormLayout.Group key={sectionIndex + 'Section'}>
                          <TextField
                            type="text"
                            label="Section Name"
                            value={section.name}
                            onChange={(e) => {
                              changeSectionName(tabIndex, sectionIndex, e);
                            }}
                          />
                        </FormLayout.Group>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          )}
        </Form>
      </SlideModal>
      <SlideModal
        title="Edit Availability"
        open={availabilityModal}
        toggleModal={() => {
          toggleModal('availability');
        }}
      >
        <AvaliabilityTable />
      </SlideModal>
      <AreYouSure
        open={deleteGroupModal}
        close={() => {
          setDeleteGroupModal(false);
        }}
        action={() => {
          deleteGroup();
        }}
      />
    </Page>
  );
}
