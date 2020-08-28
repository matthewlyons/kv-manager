import React, { useEffect, useState, useMemo } from 'react';

import { useHistory } from 'react-router-dom';

import {
  Layout,
  Select,
  Card,
  FormLayout,
  TextField,
  Page,
  Button,
  ButtonGroup,
  Modal
} from '@shopify/polaris';

import { makeRequest } from '../../util';

export default function Rental_Form(props) {
  const history = useHistory();
  const [deleteModal, setDeleteModal] = useState(false);

  const [product, setProduct] = useState({
    name: '',
    type: 'Violin',
    price: 0,
    feature1: '',
    feature2: '',
    feature3: '',
    feature4: '',
    image: '',
    credit: '',
    sizes: '',
    linkLocal: '',
    linkNational: '',
    linkEducation: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log(props);
    if (props.match.params.id) {
      console.log('Getting product');
      makeRequest('get', '/rental/' + props.match.params.id)
        .then((res) => {
          console.log(res);
          setProduct(res);
        })
        .catch((err) => {
          console.log(err);
          // TODO error handling
        });
    }
  }, []);

  const deleteProduct = () => {
    makeRequest('delete', '/rental/' + props.match.params.id)
      .then((res) => {
        history.push('/rental');
      })
      .catch((err) => {
        console.log(err);
        // TODO error handling
      });
  };

  const submitProduct = () => {
    setErrors({});
    let errorOBJ = {};
    if (product.name === undefined || product.name === '') {
      errorOBJ.name = 'Required';
    }
    if (product.price === undefined || product.price === 0) {
      errorOBJ.price = 'Required';
    }
    if (product.feature1 === undefined || product.feature1 === '') {
      errorOBJ.feature1 = 'Required';
    }
    if (product.feature2 === undefined || product.feature2 === '') {
      errorOBJ.feature2 = 'Required';
    }
    if (product.feature3 === undefined || product.feature3 === '') {
      errorOBJ.feature3 = 'Required';
    }
    if (product.feature4 === undefined || product.feature4 === '') {
      errorOBJ.feature4 = 'Required';
    }
    if (product.image === undefined || product.image === '') {
      errorOBJ.image = 'Required';
    }
    if (product.credit === undefined || product.credit === '') {
      errorOBJ.credit = 'Required';
    }
    if (product.sizes === undefined || product.sizes === '') {
      errorOBJ.sizes = 'Required';
    }
    if (product.linkLocal === undefined || product.linkLocal === '') {
      errorOBJ.linkLocal = 'Required';
    }
    if (Object.keys(errorOBJ).length > 0) {
      setErrors(errorOBJ);
    } else {
      submit(product);
    }
  };

  const submit = () => {
    if (props.match.params.id) {
      makeRequest('put', '/rental/' + props.match.params.id, product)
        .then((res) => {
          // TODO success handling
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          // TODO error handling
        });
    } else {
      makeRequest('post', '/rental/', { product })
        .then((res) => {
          history.push('/rental');
        })
        .catch((err) => {
          console.log(err);
          // TODO error handling
        });
    }
  };

  const handleInputChange = (field) => {
    return (value) => {
      setProduct({ ...product, [field]: value });
    };
  };

  const toggleModal = (modal) => {
    switch (modal) {
      case 'delete':
        setDeleteModal(!deleteModal);
        break;
      default:
        break;
    }
  };

  const options = useMemo(() => {
    return [
      { label: 'Violin', value: 'Violin' },
      { label: 'Viola', value: 'Viola' },
      { label: 'Cello', value: 'Cello' },
      { label: 'Bass', value: 'Bass' },
      { label: 'Ukulele', value: 'Ukulele' },
      { label: 'Guitar', value: 'Guitar' }
    ];
  }, []);

  let button;
  if (props.match.params.id) {
    button = (
      <ButtonGroup>
        <Button primary onClick={submitProduct}>
          Submit
        </Button>
        <Button
          onClick={() => {
            toggleModal('delete');
          }}
        >
          Delete
        </Button>
      </ButtonGroup>
    );
  } else {
    button = (
      <Button submit primary onClick={submitProduct}>
        Submit
      </Button>
    );
  }

  return (
    <Page
      full-width
      separator
      title={props.match.params.id ? 'Edit Product' : 'Add Product'}
      breadcrumbs={[
        {
          content: 'Back',
          url: '/Rental'
        }
      ]}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <FormLayout.Group>
              <TextField
                type="text"
                label="Name"
                error={errors.name}
                value={product.name}
                onChange={handleInputChange('name')}
              />
              <Select
                label="Type"
                options={options}
                value={product.type}
                onChange={handleInputChange('type')}
              />
            </FormLayout.Group>
            <FormLayout.Group>
              <TextField
                type="currency"
                label="Price"
                prefix="$"
                error={errors.price}
                value={product.price !== 0 ? product.price?.toString() : ''}
                onChange={handleInputChange('price')}
                type="number"
              />
              <TextField
                type="text"
                label="Sizes"
                error={errors.sizes}
                value={product.sizes}
                onChange={handleInputChange('sizes')}
              />
            </FormLayout.Group>
            <FormLayout.Group>
              <TextField
                type="textarea"
                label="Feature 1"
                multiline
                error={errors.feature1}
                value={product.feature1}
                onChange={handleInputChange('feature1')}
              />
              <TextField
                type="textarea"
                label="Feature 2"
                multiline
                error={errors.feature2}
                value={product.feature2}
                onChange={handleInputChange('feature2')}
              />
            </FormLayout.Group>
            <FormLayout.Group>
              <TextField
                type="textarea"
                label="Feature 3"
                multiline
                error={errors.feature3}
                value={product.feature3}
                onChange={handleInputChange('feature3')}
              />
              <TextField
                type="textarea"
                label="Feature 4"
                multiline
                error={errors.feature4}
                value={product.feature4}
                onChange={handleInputChange('feature4')}
              />
            </FormLayout.Group>
            <FormLayout.Group>
              <TextField
                type="text"
                label="Image URL"
                error={errors.image}
                value={product.image}
                onChange={handleInputChange('image')}
              />
              <TextField
                type="text"
                label="Credit Image URL"
                error={errors.credit}
                value={product.credit}
                onChange={handleInputChange('credit')}
              />
            </FormLayout.Group>
            <FormLayout.Group>
              <TextField
                type="link"
                label="Local Chargify Link"
                error={errors.linkLocal}
                value={product.linkLocal}
                onChange={handleInputChange('linkLocal')}
              />
              <TextField
                type="link"
                label="National Chargify Link"
                value={product.linkNational}
                onChange={handleInputChange('linkNational')}
              />
              <TextField
                type="link"
                label="Education Chargify Link"
                value={product.linkEducation}
                onChange={handleInputChange('linkEducation')}
              />
            </FormLayout.Group>
            <FormLayout.Group>{button}</FormLayout.Group>
          </Card>
        </Layout.Section>
      </Layout>
      <Modal
        open={deleteModal}
        onClose={() => {
          toggleModal('delete');
        }}
        title="Are you sure?"
        primaryAction={{
          content: 'Delete',
          onAction: deleteProduct
        }}
      />
    </Page>
  );
}
