import React, { useEffect, useState } from 'react';

import {
  Layout,
  Checkbox,
  FormLayout,
  TextField,
  Button,
  Card,
  Heading,
  Select
} from '@shopify/polaris';

export default function EventForm(props) {
  let { ParentProduct, ParentMetafields, SubmitProduct } = props;

  const [product, setProduct] = useState({});
  const [metafields, setMetafields] = useState([]);

  const handleSubmit = () => {
    let variants = product.variants.map((e) => {
      return {
        shopifyID: e.id,
        price: e.price,
        compare_at_price: e.compare_at_price
      };
    });
    let returnedOBJ = {
      admin: {
        title: product.title,
        body_html: product.body_html,
        image: { url: product.imageUrl }
      },
      variants,
      metafields
    };
    SubmitProduct(returnedOBJ);
  };

  // Shopify Admin Changes
  const handleInputChange = (field) => {
    return (value) => {
      setProduct({ ...product, [field]: value });
    };
  };

  // Product Variant Pricing Changes
  const handleVariantInputChange = (i, field, value) => {
    let updatedVariants = product.variants.map((variant, j) => {
      if (j == i) {
        return { ...variant, [field]: value };
      }
      return variant;
    });
    setProduct({ ...product, variants: updatedVariants });
  };

  // Activate Metafield change
  const activeChange = (i) => {
    let updatedMetafields = metafields.map((metafield, j) => {
      if (j == i) {
        return { ...metafield, active: !metafield.active };
      }
      return metafield;
    });

    setMetafields(updatedMetafields);
  };

  // Change Metafield
  const changeMetafield = (i, value) => {
    let updatedMetafields = metafields.map((metafield, j) => {
      if (j == i) {
        return { ...metafield, value };
      }
      return metafield;
    });

    setMetafields(updatedMetafields);
  };

  useEffect(() => {
    if (props.Event) {
      let { event } = props.Event;
      let variants = event.variants.map((variant) => {
        let foundVariant = ParentProduct.variants.filter(
          (e) => e.id == variant.shopifyID
        )[0];
        console.log(foundVariant);
        return {
          ...variant,
          title: foundVariant.title,
          id: foundVariant.id
        };
      });

      let updatedMetafields = ParentMetafields.map((field) => {
        let foundMetafield = event.metafields.find((e) => e.key === field.key);
        if (foundMetafield) {
          return {
            ...field,
            active: true,

            value: foundMetafield.value
          };
        }
        return { ...field };
      });

      setProduct({
        ...ParentProduct,
        ...event.admin,
        variants
      });
      setMetafields(updatedMetafields);
    } else {
      setProduct({ ...ParentProduct });
      setMetafields([...ParentMetafields]);
    }
  }, [props]);

  const options = [
    { label: 'Portland Oblong', value: 'Portland Oblong' },
    { label: 'Portland Hard Shell', value: 'Portland Hard Shell' },
    { label: 'Portland Classic', value: 'Portland Classic' },
    { label: 'Portland Advanced', value: 'Portland Advanced' },
    { label: 'Espresso Vivo', value: 'Espresso Vivo' },
    { label: 'Portland Elite', value: 'Portland Elite' },
    { label: 'Portland Professional', value: 'Portland Professional' }
  ];

  return (
    <React.Fragment>
      <Layout.Section>
        <Heading>Shopify Admin</Heading>
      </Layout.Section>
      <Layout.Section>
        <Card sectioned>
          <FormLayout>
            <TextField
              value={product.title}
              onChange={handleInputChange('title')}
              label="Product Title"
              type="text"
            />
            <TextField
              value={product.body_html}
              onChange={handleInputChange('body_html')}
              label="Body HTML"
              type="text"
              multiline={4}
            />
            <TextField
              value={product.imageUrl}
              onChange={handleInputChange('imageUrl')}
              label="New Image URL"
              type="text"
            />
          </FormLayout>
        </Card>
      </Layout.Section>
      <Layout.Section>
        <Heading>Product Variants</Heading>
      </Layout.Section>
      <Layout.Section>
        <Card sectioned>
          <FormLayout>
            {product.variants?.map((variant, i) => {
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
          </FormLayout>
        </Card>
      </Layout.Section>
      <Layout.Section>
        <Heading>Metafields</Heading>
      </Layout.Section>
      <Layout.Section>
        <Card sectioned>
          <FormLayout>
            {metafields.map((field, i) => {
              return (
                <FormLayout.Group key={i}>
                  <Heading>{field.key}</Heading>
                  <Checkbox
                    checked={field.active}
                    onChange={() => {
                      activeChange(i);
                    }}
                  />
                  {field.key === 'included_case' ? (
                    <Select
                      options={options}
                      onChange={(value) => {
                        changeMetafield(i, value);
                      }}
                      value={field.value}
                      disabled={!field.active}
                    />
                  ) : (
                    <TextField
                      value={field.value}
                      onChange={(value) => {
                        changeMetafield(i, value);
                      }}
                      type="text"
                      multiline={1}
                      disabled={!field.active}
                    />
                  )}
                </FormLayout.Group>
              );
            })}
          </FormLayout>
        </Card>
      </Layout.Section>
      <Layout.Section>
        <Button onClick={handleSubmit}>Submit</Button>
      </Layout.Section>
    </React.Fragment>
  );
}
