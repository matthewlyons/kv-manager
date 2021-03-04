import React, { useState, useEffect, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import {
  Page,
  Layout,
  ResourceList,
  ResourceItem,
  TextStyle,
  Thumbnail,
  Card,
  DataTable,
  TextField,
  Modal,
  TextContainer,
  Button
} from '@shopify/polaris';

import { makeRequest } from '../../util';

export default function Teacher_Order_Create() {
  let history = useHistory();
  const [teacher, setTeacher] = useState({});
  const [products, setProducts] = useState([]);
  const [productModal, setProductModal] = useState(false);
  const [cart, setCart] = useState([]);

  let { id } = useParams();

  const toggleModal = (modal) => {
    switch (modal) {
      case 'product':
        setProductModal(!productModal);
        break;
      default:
        break;
    }
  };

  const removeOneFromCart = (index) => {
    let updatedCart;

    if (cart[index].quantity < 2) {
      updatedCart = [...cart];
      updatedCart.splice(Number(index), 1);
    } else {
      updatedCart = cart.map((item, i) => {
        if (i == index) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      });
    }
    setCart(updatedCart);
  };
  const removeAllFromCart = (index) => {
    let updatedCart;
    updatedCart = [...cart];
    updatedCart.splice(Number(index), 1);
    setCart(updatedCart);
  };

  const addToCart = (index) => {
    let product = products[index];
    let inCart = cart.filter((x) => x.index === index).length > 0;
    let updatedCart;
    if (inCart) {
      updatedCart = cart.map((item) => {
        if (item.index === index) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
    } else {
      updatedCart = [...cart];
      updatedCart.push({ ...product, quantity: 1, index });
    }
    setCart(updatedCart);
  };

  const submitOrder = () => {
    let totalPoints = cart.reduce((total, item) => {
      return item.quantity * item.points + total;
    }, 0);

    if (totalPoints > teacher.points) {
      alert("Teacher Doesn't Have Enough Points");
      return;
    }

    makeRequest('post', '/teacher-store/Orders', {
      teacher: teacher._id,
      items: cart
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    makeRequest('get', '/teacher-store/Products')
      .then((response) => {
        setProducts(response);
      })
      .catch((err) => {
        console.log(err);
      });
    makeRequest('GET', `/teacher/${id}`).then((data) => {
      setTeacher(data);
      console.log(data);
    });
  }, [id]);

  const name = useMemo(() => {
    let result =
      teacher.title != 'N/A' && teacher.title
        ? `${teacher.title}. ${teacher.firstName} ${teacher.lastName}`
        : `${teacher.firstName} ${teacher.lastName}`;
    return result;
  }, [teacher]);

  return (
    <Page
      full-width
      title={'New Order for ' + name}
      breadcrumbs={[
        {
          content: 'Back',
          onAction: () => {
            history.goBack();
          }
        }
      ]}
      primaryAction={{
        content: 'Submit',
        onAction: submitOrder
      }}
    >
      <Layout>
        <Layout.Section fullWidth>
          <Card>
            <ResourceList
              resourceName={{ singular: 'customer', plural: 'customers' }}
              items={cart}
              renderItem={(item, index) => {
                const { _id, title, quantity, points } = item;
                const shortcutActions = [
                  {
                    content: 'Subtract One',
                    onAction: () => {
                      removeOneFromCart(index);
                    }
                  },
                  {
                    content: 'Remove All',
                    onAction: () => {
                      removeAllFromCart(index);
                    }
                  }
                ];
                return (
                  <ResourceItem
                    id={_id}
                    accessibilityLabel={`View details for ${title}`}
                    shortcutActions={shortcutActions}
                  >
                    <h3>
                      <TextStyle variation="strong">{title}</TextStyle>
                    </h3>
                    <div>
                      {points} Points x {quantity} | {points * quantity} Points
                      Total
                    </div>
                  </ResourceItem>
                );
              }}
            />
          </Card>
        </Layout.Section>
        <Layout.Section fullWidth>
          <Button
            onClick={() => {
              toggleModal('product');
            }}
          >
            Add Products
          </Button>
        </Layout.Section>
      </Layout>
      <Modal
        open={productModal}
        onClose={() => {
          toggleModal('product');
        }}
        title="Reach more shoppers with Instagram product tags"
      >
        <Modal.Section>
          <div>
            {products.map((item, i) => {
              return (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '7% auto',
                    gridColumnGap: '10px'
                  }}
                >
                  <Button
                    onClick={() => {
                      addToCart(i);
                    }}
                  >
                    +
                  </Button>
                  <h1 style={{ display: 'flex', alignItems: 'center' }}>
                    {item.title} | {item.points} Points
                  </h1>
                </div>
              );
            })}
          </div>
        </Modal.Section>
      </Modal>
    </Page>
  );
}
