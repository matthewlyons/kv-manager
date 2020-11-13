import React, { useState, useCallback, useEffect } from 'react';
import _ from 'underscore';

import {
  Page,
  Layout,
  Form,
  FormLayout,
  TextField,
  Button,
  Card,
  SkeletonBodyText,
  Heading,
  Modal,
  DatePicker
} from '@shopify/polaris';

import useQuery from '../../hooks/useQuery';

import { makeRequest } from '../../util';

export default function Product_Schedule_View() {
  let id = useQuery().get('id');
  const [product, setProduct] = useState({});
  const [eventProduct, setEventProduct] = useState({});

  const [{ month, year }, setDate] = useState({
    month: new Date(Date.now()).getMonth(),
    year: new Date(Date.now()).getFullYear()
  });

  const [selectedDates, setSelectedDates] = useState({
    start: new Date(new Date().setDate(new Date().getDate() + 1)),
    end: new Date(new Date().setDate(new Date().getDate() + 1))
  });

  const [loading, setLoading] = useState(true);
  const [dateModal, setDateModal] = useState(false);

  const handleInputChange = (field) => {
    return (value) => {
      setEventProduct({ ...eventProduct, [field]: value });
    };
  };

  const handleVariantInputChange = (i, field, value) => {
    let updatedVariants = eventProduct.variants;
    updatedVariants[i][field] = value;
    setEventProduct({ ...eventProduct, variants: updatedVariants });
  };

  const submit = () => {
    console.log('Submitting');
  };

  const toggleModal = (modal) => {
    switch (modal) {
      case 'date':
        setDateModal(!dateModal);
        break;
      default:
        break;
    }
  };

  const handleMonthChange = useCallback(
    (month, year) => setDate({ month, year }),
    []
  );

  useEffect(() => {
    makeRequest('GET', `/shopify/products/${id}`).then((data) => {
      console.log(data);
      let regularPrice = data.metafield.filter(
        (fields) => fields.key === 'original_price'
      );
      let productOBJ = { ...data.product, regularPrice: regularPrice.value };
      setProduct(productOBJ);
      setEventProduct(productOBJ);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log(product);
  }, [selectedDates]);

  return (
    <Page
      full-width
      separator
      title="Products"
      breadcrumbs={[
        {
          content: 'Back',
          url: '/'
        }
      ]}
      primaryAction={{
        content: 'Edit Dates',
        onAction: () => {
          toggleModal('date');
        }
      }}
    >
      <Layout>
        <Layout.Section>
          {loading ? (
            <Card sectioned>
              <SkeletonBodyText />
            </Card>
          ) : (
            <Form onSubmit={submit}>
              <FormLayout.Group>
                <TextField
                  value={eventProduct.title}
                  onChange={handleInputChange('title')}
                  label="Product Title"
                  type="text"
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  value={eventProduct.body_html}
                  onChange={handleInputChange('body_html')}
                  label="Body HTML"
                  type="text"
                  multiline={4}
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  value={eventProduct.regularPrice}
                  onChange={handleInputChange('regularPrice')}
                  label="Regular Price"
                  type="number"
                  prefix="$"
                  helpText="A Products Regular Price only Shows when a product is on sale. This price is the original price of a product before it's sale price."
                />
              </FormLayout.Group>
              {eventProduct.variants.map((variant, i) => {
                return (
                  <FormLayout.Group key={i}>
                    <Heading>{variant.title}</Heading>
                    <TextField
                      value={variant.price}
                      onChange={(e) => {
                        handleVariantInputChange(i, 'price', e);
                      }}
                      label="Price"
                      type="number"
                      prefix="$"
                    />
                    <TextField
                      value={variant.compare_at_price}
                      onChange={(e) => {
                        handleVariantInputChange(i, 'compare_at_price', e);
                      }}
                      label="Compare At Price"
                      type="number"
                      prefix="$"
                    />
                  </FormLayout.Group>
                );
              })}

              <FormLayout.Group>
                <Button submit>Save</Button>
              </FormLayout.Group>
            </Form>
          )}
        </Layout.Section>
      </Layout>
      <Modal
        open={dateModal}
        onClose={() => toggleModal('date')}
        title="Edit Active Dates"
      >
        <Modal.Section>
          <FormLayout>
            <DatePicker
              month={month}
              year={year}
              onChange={setSelectedDates}
              onMonthChange={handleMonthChange}
              selected={selectedDates}
              allowRange={true}
              disableDatesBefore={new Date(Date.now())}
            />
          </FormLayout>
        </Modal.Section>
      </Modal>
    </Page>
  );
}
