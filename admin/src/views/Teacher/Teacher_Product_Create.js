import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  Spinner
} from '@shopify/polaris';

import { makeRequest } from '../../util';
import Loading from '../../components/Loading';

export default function Teacher_Product_Create() {
  let history = useHistory();
  let { id } = useParams();

  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    title: '',
    points: 50,
    description: ''
  });

  const [errors, setErrors] = useState({});

  const [name, setName] = useState('');

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileRead = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setImage(base64);
    setName(file.name);
  };

  const onFormSubmit = () => {
    if (id) {
      setLoading(true);
      makeRequest('put', `/teacher-store/products/${id}`, {
        ...product,
        image: { image, name }
      })
        .then((res) => {
          setLoading(false);
          history.push('/Teacher/Products');
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          // TODO error handling
        });
    } else {
      setLoading(true);
      makeRequest('post', '/teacher-store/products', {
        ...product,
        image: { image, name }
      })
        .then((res) => {
          setLoading(false);
          history.push('/Teacher/Products');
        })
        .catch((err) => {
          setLoading(false);
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

  const deleteProduct = () => {
    console.log('Deleting Product');
    setLoading(true);
    makeRequest('delete', `/teacher-store/products/${id}`)
      .then((res) => {
        setLoading(false);
        history.push('/Teacher/Products');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        // TODO error handling
      });
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      makeRequest('GET', `/teacher-store/products/${id}`)
        .then((response) => {
          setLoading(false);
          console.log(response);
          let { title, description, points, image } = response;

          setProduct({ title, description, points });
          setImage(image.url);
          setName(image.name);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      console.log('No ID');
    }
  }, [id]);

  return (
    <div>
      <Page
        full-width
        title={id ? `Edit Product` : 'Add a Product to the Teacher Store'}
        breadcrumbs={[
          {
            content: 'Back',
            url: '/Teacher/Products'
          }
        ]}
        primaryAction={{
          content: 'Submit',
          onAction: onFormSubmit
        }}
        secondaryActions={[
          {
            content: 'Delete',
            onAction: deleteProduct
          }
        ]}
      >
        <Layout>
          <Layout.AnnotatedSection title="Product details">
            <Card sectioned>
              <FormLayout>
                <TextField
                  type="text"
                  label="Title"
                  error={errors.title}
                  value={product.title}
                  onChange={handleInputChange('title')}
                />
                <TextField
                  type="number"
                  label="Points"
                  error={errors.points}
                  value={`${product.points}`}
                  onChange={handleInputChange('points')}
                />
                <TextField
                  type="text"
                  label="Description"
                  error={errors.description}
                  value={product.description}
                  multiline={4}
                  onChange={handleInputChange('description')}
                />
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>

          <Layout.Section secondary>
            <Card sectioned title="Image Preview">
              {image ? (
                <img src={image} alt="HelloWorld" style={{ width: '100%' }} />
              ) : (
                ''
              )}
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card sectioned title="Product Image">
              <form onSubmit={onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" name="myImage" onChange={handleFileRead} />
              </form>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
      {loading && <Loading />}
    </div>
  );
}
